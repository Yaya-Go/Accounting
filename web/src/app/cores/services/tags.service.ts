import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tag } from '../../config/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  private readonly API = environment.API;
  
  constructor(private http: HttpClient) { }

  Retrieve(tagId: string) {
    return this.http.get(`${ this.API }/tag/${ tagId }`);
  }

  Create(tag: Tag) {      
    return this.http.post(`${ this.API }/tag`, tag);
  }

  List() {
    return this.http.get(`${ this.API }/tags`);
  }

  Update(tagId: string, name: string) {
    return this.http.put(`${ this.API }/tag/${ tagId }`, { name });
  }

  Delete(tagId: string) {
    return this.http.delete(`${ this.API }/tag/${ tagId }`);
  }
}
