import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, pluck } from 'rxjs';
import { Comments } from './comment';
import { CommentService } from './comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  comments$ = this.commentService.getComments();

  comment$ = this.route.data.pipe(pluck('comments'));

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.route.data.subscribe((data) => {
    //   console.log(data['comments']);
    // });
  }
}
