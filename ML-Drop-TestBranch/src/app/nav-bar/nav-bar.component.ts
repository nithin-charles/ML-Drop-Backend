import { Component, inject, viewChild } from '@angular/core';
import { BlockManagerService } from '../service/block-manager.service';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  readonly menuTrigger = viewChild.required(MatMenuTrigger);

  readonly dialog = inject(MatDialog);
  constructor(private _blockManagerService: BlockManagerService) {}

  public addBlock(): void {
    console.log('Block Added');
    this._blockManagerService.addBlock();
  }

  public deleteAllBlock(): void {
    this._blockManagerService.deleteAllBlocks();
    this._blockManagerService.getJsPlumbInstance().deleteEveryConnection();
    this._blockManagerService.getJsPlumbInstance().deleteEveryEndpoint();
  }

  public openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      restoreFocus: false,
    });

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed().subscribe(() => this.menuTrigger().focus());
  }
}
