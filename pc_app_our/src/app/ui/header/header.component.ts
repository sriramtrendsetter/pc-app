import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course/course.service';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  courseList = [];
  courseGropList = [];
  constructor(private courseSer: CourseService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.courseSer.getCourses().subscribe(data=> {
      this.courseList = data.courses;
      console.log('Header->ngOnInit() courseList-->', this.courseList);
      const groupedCollection = this.courseList.reduce((previous, current)=> {
        let property = 'type';
        if(!previous[current[property]]) {
            previous[current[property]] = [current];
        } else {
            previous[current[property]].push(current);
        }
        return previous;
    }, {});

    // this will return an array of objects, each object containing a group of objects
       this.courseGropList =  Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] }));
      console.log('courseGropList',this.courseGropList );

    });


    $('body').on('mouseenter mouseleave', '.dropdown', function (e) {
      var dropdown = $(e.target).closest('.dropdown');
      var menu = $('.dropdown-menu', dropdown);
      dropdown.addClass('show');
      menu.addClass('show');
      setTimeout(function () {
          dropdown[dropdown.is(':hover') ? 'addClass' : 'removeClass']('show');
          menu[dropdown.is(':hover') ? 'addClass' : 'removeClass']('show');
      }, 100);
  });

 


  }


}
