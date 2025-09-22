import { Component, ChangeDetectionStrategy, inject, signal, computed } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogData } from "../interfaces/dialog-data";

@Component({
    selector: 'app-Confirmation-dialog',
    template: `<h2 mat-dialog-title>{{dialogData().title}}</h2>
<mat-dialog-content>
 {{dialogData().message}}
</mat-dialog-content>
<mat-dialog-actions>
  <button matButton [mat-dialog-close]="false">{{dialogData().noButtonText  || 'Nao'}}</button>
  <button matButton [mat-dialog-close]="true" cdkFocusInitial>{{dialogData().yesButtonText  ||'Sim'}}</button>
</mat-dialog-actions>
`,
    imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
    readonly dialogRef = inject(MatDialogRef<ConfirmationDialogComponent>);
    readonly dialogData = signal(inject<DialogData>(MAT_DIALOG_DATA));

    private defaultDialogData: Partial<DialogData> = {
        noButtonText: 'No',
        yesButtonText: 'Yes'
    }

    resolvedDialogData = computed(() => {
        return {
            ...this.defaultDialogData,
            ...this.dialogData()
        }
    })
}