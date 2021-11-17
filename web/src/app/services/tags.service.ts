import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tag } from '../config/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  private readonly API = environment.API;
  
  constructor(private http: HttpClient) { }

  Create(tag: Tag) {      
    return this.http.post(`${ this.API }/tags`, tag);
  }

  List() {
    return this.http.get(`${ this.API }/tags`);
  }

  Update(tagId: string, name: string) {
    return this.http.put(`${ this.API }/tags/${ tagId }`, { name });
  }

  Delete(tagId: string) {
    return this.http.delete(`${ this.API }/tags/${ tagId }`);
  }
}
