'use strict';

(function(){

    /**
    * wshVanillaCalendar Module
    */

    var wshVanillaCalendar = function(){

        var self = this;

        // var domElements = {
        //     tabNav          : document.querySelectorAll('[ui-tab-nav]'),
        //     tab             : document.querySelectorAll('[ui-tab]')
        // };

        this.calendarActiveInstance = {};

        this.monthNames = 
        [
            'January' , 'February' , 'March'     ,
            'April'   , 'May'      , 'June'      ,
            'July'    , 'August'   , 'September' ,
            'October' , 'November' , 'December'
        ];

        this.monthShortNames =
        [
         '',   'Jan', 'Feb', 'Mar',
        'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep',
        'Oct', 'Nov', 'Dec'
        ];

        this.weekdays  = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        this.monthDays = [ 31,28,31, 30,31,30, 31,31,30, 31,30,31 ],


        //Get today's date - year, month, day and date
        this.today = new Date();
        this.opt   = {};
        this.data  = [];

        //Functions
    
        // Used to create HTML in a optimized way.
        this.wrt = function(txt) {
            this.data.push(txt);
        },
 

        this.init = function(){
            this.bindEvents();
        };

        this.bindEvents = function() {
            document.body.onmouseup = function (event) {
                var target = event.target || event.toElement;
                if (target.hasAttribute('ui-tab-nav')){ self.showTab(); }
            };
        };

        this.getPosition = function(ele) {
            var x = 0;
            var y = 0;

            while (ele) {
                x  += ele.offsetLeft;
                y  += ele.offsetTop;
                ele = ele.offsetParent;
            }

            if (navigator.userAgent.indexOf('Mac') !== -1 && typeof document.body.leftMargin !== 'undefined') {
                x += document.body.leftMargin;
                this.offsetTop += document.body.topMargin;
            }

            var xy = new Array(x,y);
            return xy;
        };

            // Called when the user clicks on a date in the calendar.
            this.selectDate = function(year, month, day) {

                var ths = this.calendarActiveInstance;

                if (ths.opt['onDateSelect'])
                {
                    ths.opt['onDateSelect'].apply(ths, [year,month,day]); // Custom handler if the user wants it that way.
                }
                else
                {
                    document.getElementById(ths.opt['input']).value = day + '-' + this.monthShortNames[parseInt(month)] + '-' + year;
                    ths.hideCalendar();
                }
            };

            // Creates a calendar with the date given in the argument as the selected date.
            this.makeCalendar = function(year, month, day)
            {
                year = parseInt(year);
                month= parseInt(month);
                day  = parseInt(day);

                //Display the table
                var nextMonth = month + 1;
                var nextMonthYear = year;
                if(nextMonth >= 12) {
                    nextMonth = 0;
                    nextMonthYear++;
                }

                var previousMonth = month - 1;
                var previousMonthYear = year;
                if(previousMonth < 0) {
                    previousMonth = 11;
                    previousMonthYear--;
                }

                this.wrt('<div class="date-picker__header">');
                this.wrt('<a class="date-picker__prev" href="javascript:calendar.makeCalendar(' + (previousMonthYear) + ',' + (previousMonth) + ');" title=" '+ this.monthNames[previousMonth] + ' ' + (previousMonthYear) + '">Previous</a>');
                this.wrt('<div class="date-picker__title"><select name="calendar-month" class="date-picker__month" onChange="calendar.makeCalendar(' + year + ', this.value);">');

                for(var i in this.monthNames)
                {
                    this.wrt('<option value="' + i + '"');
                    if(i === month) {
                        this.wrt(' selected="selected"');
                    }
                    this.wrt('>' + this.monthNames[i] + '</option>');
                }

                this.wrt('</select>');
                this.wrt("<select name='calendar-year' class='date-picker__year' onChange='calendar.makeCalendar(this.value, "+month+");'>");

                var current_year = this.today.getYear();
                if(current_year < 1900) current_year += 1900;

                for(var i=current_year-70; i<current_year+10; i++) {
                    this.wrt("<option value='"+i+"'")
                    if(i == year) this.wrt(" selected='selected'");
                    this.wrt(">"+i+"</option>");
                }
                this.wrt("</select></div>");
                this.wrt("<a class='date-picker__next' href='javascript:calendar.makeCalendar("+(nextMonthYear)+","+(nextMonth)+");' title='"+this.monthNames[nextMonth]+" "+(nextMonthYear)+"'>Next</a></div>");
                this.wrt("<table class='calendar'><thead><tr>");
                for(var weekday=0; weekday<7; weekday++) this.wrt("<th><span>"+this.weekdays[weekday]+"</span></th>");
                this.wrt("</tr></thead><tbody>");

                //Get the first day of this month
                var first_day = new Date(year,month,1);
                var start_day = first_day.getDay();

                var d = 1;
                var flag = 0;

                //Leap year support
                if(year % 4 == 0) this.month_days[1] = 29;
                else this.month_days[1] = 28;

                var days_in_this_month = this.month_days[month];

                //Create the calender
                for(var i=0;i<=5;i++) {
                    if(w >= days_in_this_month) break;
                    this.wrt("<tr>");
                    for(var j=0;j<7;j++) {
                        if(d > days_in_this_month) flag=0; //If the days has overshooted the number of days in this month, stop writing
                        else if(j >= start_day && !flag) flag=1;//If the first day of this month has come, start the date writing

                        if(flag) {
                            var w = d, mon = month+1;
                            if(w < 10)  w   = "0" + w;
                            if(mon < 10)mon = "0" + mon;

                            //Is it today?
                            var class_name = '';
                            var yea = this.today.getYear();
                            if(yea < 1900) yea += 1900;

                            if(yea == year && this.today.getMonth() == month && this.today.getDate() == d) class_name = " calender__date--current";
                            if(day == d) class_name += " calender__date--active";

                            class_name += " " + this.weekdays[j].toLowerCase();

                            this.wrt("<td class='" + class_name + "'><a href='javascript:calendar.selectDate(\""+year+"\",\""+mon+"\",\""+w+"\")'><span>"+w+"</span></a></td>");
                            d++;
                        } else {
                            this.wrt("<td class='days'><span class='calender__date--unselectable'>&nbsp;</span></td>");
                        }
                    }
                    this.wrt("</tr>");
                }
                this.wrt("</tbody></table>");
                // this.wrt("<div class='date-picker__footer'><button class='btn' onclick='calendar.hideCalendar();'>Cancel</button><button class='btn' onclick='calendar.hideCalendar();'>Today</button></div>");

                document.getElementById(this.opt['calendar']).innerHTML = this.data.join("");
                this.data = [];
            },

    };

    var calendar = new wshVanillaCalendar();
    calendar.init();

})();
