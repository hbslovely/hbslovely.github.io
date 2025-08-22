import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EditorComponent } from './components/editor/editor.component';
import { FileExplorerComponent } from './components/file-explorer/file-explorer.component';
import { PreviewComponent } from './components/preview/preview.component';
import { ConsoleComponent } from './components/console/console.component';
import { NetworkComponent } from './components/network/network.component';
import { ElementsInspectorComponent } from './components/elements-inspector/elements-inspector.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    EditorComponent,
    FileExplorerComponent,
    PreviewComponent,
    ConsoleComponent,
    NetworkComponent,
    ElementsInspectorComponent
  ]
})
export class AppComponent {
  activeTab: 'console' | 'network' | 'elements' = 'console';
}
