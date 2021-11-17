import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../config/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly API = environment.API;

  constructor(private http: HttpClient) { }

  getCategoryByTag(tagId: string) {
    return this.http.get(`${ this.API }/tags/${ tagId }/category`);
  }

  Create(category: Category) {
    return this.http.post(`${ this.API }/category`, category);
  }

  Update(categoryId: string, name: string) {
    return this.http.put(`${ this.API }/category/${ categoryId }`, { name });
  }

  Delete(categoryId: string) {
    return this.http.delete(`${ this.API }/category/${ categoryId }`);
  }
}
