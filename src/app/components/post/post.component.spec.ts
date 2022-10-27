import {TestBed } from '@angular/core/testing'
import { first } from "rxjs";
import { Post } from "src/app/models/post";
import { PostComponent } from "./post.component";
import { ComponentFixture } from "@angular/core/testing"
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('post component', () => {
  let comp: PostComponent;
  let fixture: ComponentFixture<PostComponent>
  let post: Post;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(PostComponent);
    comp = fixture.componentInstance;

    post = { id: 1, body: 'body 1', title: 'Title 1' };
  });

  it('should create post component using TestBed', () => {
    expect(comp).toBeDefined();
  })

  it('should render the post title in the anchor element', () => {
    comp.post = post;
    fixture.detectChanges();
    const postElement: HTMLElement = fixture.nativeElement;
    const a = postElement.querySelector('a');

    expect(a?.textContent).toContain(post.title);
  })

  it('should raise an event wehen the delete post is clicked', () => {
    comp.post = post;

    comp.delete.pipe(first()).subscribe(selectedPost => {
      expect(selectedPost).toEqual(post);
    })

    comp.onDeletePost(new MouseEvent('click'));
  });

})
