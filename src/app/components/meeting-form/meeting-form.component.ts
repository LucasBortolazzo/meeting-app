import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MeetingService } from 'src/app/service/meeting.service';

@Component({
  selector: 'app-meeting-form',
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.css']
})
export class MeetingFormComponent implements OnInit {

  public meetingForm: FormGroup;
  public idEdit: string;

  constructor(public dialogRef: MatDialogRef<MeetingFormComponent>,
    @Inject(MAT_DIALOG_DATA) @Optional() public data: string,
    private fb: FormBuilder,
    private service: MeetingService) {
    this.idEdit = data;
  }

  ngOnInit(): void {
    this.meetingForm = this.fb.group({
      id: [null],
      meetingName: [null, Validators.required],
      meetingSubject: [null, Validators.required],
      meetingResponsible: [null, Validators.required],
      meetingDate: [null, Validators.required],
      meetingTime: [null, Validators.required],
    })

    if (this.idEdit != null) {
      this.getById()
    }
  }

  getById() {
    this.service.getById(this.idEdit).subscribe(
      (meeting) => {
        this.meetingForm.patchValue(meeting);
      },
      (error) => {
        console.log('ocorreu um erro em getById!', error)
      }
    )
  }

  cancelMeeting(): void {
    this.dialogRef.close();
  }

  saveMeeting(): void {
    if (this.meetingForm.value.id) {
      this.updateMeeting();
    } else {
      this.createMeeting();
    }
  }

  createMeeting() {
    this.service.insert(this.meetingForm.value).subscribe(
      (data) => {
        console.log('Meeting criada com sucesso!', data);
      },
      (error) => {
        console.log('Ocorreu um erro ao inserir', error)
      }
    )

    this.dialogRef.close(true);
    this.meetingForm.reset();
    window.location.reload();
  }

  updateMeeting() {
    this.service.update(this.meetingForm.value).subscribe(
      (data) => {
        console.log('Meeting atualizada com sucesso!', data);
      },
      (error) => {
        console.log('Ocorreu um erro oa atualizar', error)
      }
    )

    this.dialogRef.close(true);
    this.meetingForm.reset();
    window.location.reload();
  }
}
