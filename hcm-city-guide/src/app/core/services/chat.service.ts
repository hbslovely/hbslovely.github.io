import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isTyping?: boolean;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly apiUrl = 'https://api.openai.com/v1/chat/completions';
  private currentSession: ChatSession | null = null;
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  private isTypingSubject = new BehaviorSubject<boolean>(false);

  public messages$ = this.messagesSubject.asObservable();
  public isTyping$ = this.isTypingSubject.asObservable();

  constructor(private http: HttpClient) {
    this.initializeSession();
  }

  private initializeSession() {
    this.currentSession = {
      id: this.generateSessionId(),
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.messagesSubject.next([]);
  }

  sendMessage(content: string): Observable<ChatMessage> {
    if (!content.trim()) {
      throw new Error('Message content cannot be empty');
    }

    const userMessage: ChatMessage = {
      id: this.generateMessageId(),
      content: content.trim(),
      role: 'user',
      timestamp: new Date()
    };

    // Add user message immediately
    this.addMessage(userMessage);

    // Show typing indicator
    this.isTypingSubject.next(true);

    // Prepare OpenAI request
    const requestBody = {
      model: 'gpt-3.5-turbo',
      messages: this.prepareMessagesForAPI(),
      max_tokens: 500,
      temperature: 0.7,
      stream: false
    };

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.openaiApiKey}`,
      'Content-Type': 'application/json'
    });

    return new Observable(observer => {
      this.http.post<any>(this.apiUrl, requestBody, { headers }).subscribe({
        next: (response) => {
          this.isTypingSubject.next(false);
          
          const assistantMessage: ChatMessage = {
            id: this.generateMessageId(),
            content: response.choices[0]?.message?.content || 'Sorry, I could not generate a response.',
            role: 'assistant',
            timestamp: new Date()
          };

          this.addMessage(assistantMessage);
          observer.next(assistantMessage);
          observer.complete();
        },
        error: (error) => {
          this.isTypingSubject.next(false);
          
          const errorMessage: ChatMessage = {
            id: this.generateMessageId(),
            content: 'Sorry, I encountered an error. Please try again.',
            role: 'assistant',
            timestamp: new Date()
          };

          this.addMessage(errorMessage);
          observer.error(error);
        }
      });
    });
  }

  private prepareMessagesForAPI(): any[] {
    const systemMessage = {
      role: 'system',
      content: `You are a helpful AI assistant for the Ho Chi Minh City Guide website. You help tourists and visitors with information about:
      
- Tourist attractions and landmarks
- Local food and restaurants
- Transportation options
- Cultural sites and traditions
- Shopping areas and markets
- Accommodation recommendations
- Travel tips and advice
- Weather and best times to visit
- Local customs and etiquette

Keep your responses concise, helpful, and focused on Ho Chi Minh City. If asked about topics outside of travel and tourism in Ho Chi Minh City, politely redirect the conversation back to the city guide topics.`
    };

    const conversationMessages = this.currentSession?.messages.map(msg => ({
      role: msg.role,
      content: msg.content
    })) || [];

    return [systemMessage, ...conversationMessages];
  }

  private addMessage(message: ChatMessage) {
    if (this.currentSession) {
      this.currentSession.messages.push(message);
      this.currentSession.updatedAt = new Date();
      this.messagesSubject.next([...this.currentSession.messages]);
    }
  }

  getMessages(): ChatMessage[] {
    return this.currentSession?.messages || [];
  }

  clearSession() {
    this.initializeSession();
  }

  getCurrentSession(): ChatSession | null {
    return this.currentSession;
  }

  private generateSessionId(): string {
    return 'session-' + Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private generateMessageId(): string {
    return 'msg-' + Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Quick response suggestions
  getQuickSuggestions(): string[] {
    return [
      'What are the must-visit attractions?',
      'Best local food recommendations',
      'How to get around the city?',
      'Where to stay in Ho Chi Minh City?',
      'What is the best time to visit?',
      'Tell me about local culture'
    ];
  }
}
