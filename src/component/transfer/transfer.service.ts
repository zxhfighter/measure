import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class TransferService {
    private subject = new Subject();

    /**
     * subject send message to observer
     * @param countObj 
     * @docs-private
     */
    sendMsg(countObj) {
        this.subject.next(countObj);
    }

    /**
     * observer get message from subject
     * @docs-private
     */
    getMsg(): Observable<any> {
        return this.subject.asObservable();
    }
}