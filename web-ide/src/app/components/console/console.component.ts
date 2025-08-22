import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorService } from '../../services/editor.service';
import { ConsoleLog } from '../../models/file.model';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ConsoleComponent implements OnInit {
  logs: ConsoleLog[] = [];
  filteredLogs: ConsoleLog[] = [];
  activeLogTypes: Set<ConsoleLog['type']> = new Set(['log', 'error', 'warn', 'info']);

  constructor(private editorService: EditorService) {}

  ngOnInit() {
    // Subscribe to console logs from the editor service
    this.logs = [
      {
        type: 'info',
        message: 'Console initialized',
        timestamp: new Date()
      },
      {
        type: 'log',
        message: 'Ready to receive logs',
        timestamp: new Date()
      }
    ];
    this.filterLogs();
  }

  showLogType(type: ConsoleLog['type']): boolean {
    return this.activeLogTypes.has(type);
  }

  toggleLogType(type: ConsoleLog['type']) {
    if (this.activeLogTypes.has(type)) {
      this.activeLogTypes.delete(type);
    } else {
      this.activeLogTypes.add(type);
    }
    this.filterLogs();
  }

  clearLogs() {
    this.logs = [];
    this.filterLogs();
  }

  private filterLogs() {
    this.filteredLogs = this.logs.filter(log => this.activeLogTypes.has(log.type));
  }
}
