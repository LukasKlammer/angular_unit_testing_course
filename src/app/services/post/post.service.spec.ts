import {PostService} from "./post.service";

import {HttpClient} from "@angular/common/http";
import {Post} from "src/app/models/post";
import {of} from "rxjs";
import {TestBed} from "@angular/core/testing";

describe('Post Service :-)', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let postService: PostService;
  let POSTS: Post[] = [];

  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        PostService, {
          provide: HttpClient,
          useValue: httpClientSpyObj
        },
      ],
    })
    postService = TestBed.inject(PostService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>
    POSTS = [
      {
        id: 1,
        body: 'body 1',
        title: 'title 1'
      },
      {
        id: 2,
        body: 'body 2',
        title: 'title 2'
      },
      {
        id: 3,
        body: 'body 3',
        title: 'title 3'
      },
    ];
  });

  describe('getPosts()', () => {
    it('should return expected posts when getposts is called', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of(POSTS));
      postService.getPosts().subscribe({
        next: (posts: Post[]) => {
          expect(posts).toEqual(POSTS);
          done();
        },
        error: () => {
          done.fail;
        },
      });
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });
  });

});
