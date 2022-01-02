import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MeetingService } from 'src/app/service/meeting.service';
import { MeetingFormComponent } from '../meeting-form/meeting-form.component';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

@Component({
    selector: 'app-meeting-list',
    templateUrl: './meeting-list.component.html',
    styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent implements OnInit {

    displayedColumns: string[] = ['meetingName', 'meetingSubject', 'meetingResponsible', 'meetingDate', 'meetingTime', 'action'];
    meetings = [];
    lengthMeets: number;
    pageSize = 5;
    totalRecordsPerPage = 5;
    meetingNameFind: string;
    meetingDateFind: string;

    constructor(
        private service: MeetingService,
        public dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.findAll(0, 'meetingDate', null);
    }

    findAll(pageNumber: number, sortField: string, filters: any) {
        this.service.getAll(pageNumber, this.totalRecordsPerPage, sortField, filters).subscribe(
            (meetingsReturn: any) => {
                this.meetings = meetingsReturn['meeting'];
                this.lengthMeets = meetingsReturn['page'].size;
                console.log('findAll executado com sucesso!')
            },
            (error) => {
                console.log('Ocorreu um erro!', error)
            }
        );

    }

    getServerData(event: PageEvent) {
        this.totalRecordsPerPage = event.pageSize;
        this.findAll(event.pageIndex, 'meetingDate', null);
    }

    editMeeting(id: number): void {
        const dialogRef = this.dialog.open(MeetingFormComponent, {
            width: '500px',
            data: id
        })
    }

    deleteMeeting(id: number): void {
        if (window.confirm('Deseja excluir essa meeting? ' + id)) {
            this.service.delete(id).subscribe();
        }

        window.location.reload();
    }

    pesquisarMeet() {
        const filter = `meetingName=${this.meetingNameFind}`;
        this.findAll(0, 'meetingDate', filter);
    }
}
