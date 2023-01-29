import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-feed',
  templateUrl: './main-feed.component.html',
  styleUrls: ['./main-feed.component.css']
})
export class MainFeedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  postItems = [
    {
      postCaption: "Hello world",
      postImage: "",
      postDate: new Date()
    },
    {
      postCaption: "Good Morning !",
      postImage: "../../../assets/WallpaperDog-20356318.jpg",
      postDate: new Date()
    },
    {
      postCaption: "I Love Coding",
      postImage: "../../../assets/WallpaperDog-20356296.jpg",
      postDate: new Date()
    },
    {
      postCaption: "Hello world",
      postImage: "../../../assets/WallpaperDog-20356345.jpg",
      postDate: new Date()
    },
    {
      postCaption: "Good Morning !",
      postImage: "../../../assets/WallpaperDog-20356318.jpg",
      postDate: new Date()
    },
    {
      postCaption: "I Love Coding",
      postImage: "../../../assets/WallpaperDog-20356296.jpg",
      postDate: new Date()
    }
  ]
}
