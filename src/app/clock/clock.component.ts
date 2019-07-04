import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Days, ClockNode } from './clock.types';

@Component({
  selector: 'wed-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.less']
})
export class ClockComponent implements OnInit {

  clockRows = [
    'ITXISDHALFAD',
    'QUARTERONTEN',
    'TWENTYIFIVED',
    'AMINUTESATOR',
    'UWEDNESDAYAR',
    'PASTANINETWO',
    'THREEORFOURA',
    'FIVEMYXDUDES',
    'EIGHTONEDTEN',
    'ASIXOSEVENTI',
    'TWELVEELEVEN',
    'CAFESO\'CLOCK'
  ];

  clockFace: ClockNode[][] = [];

  wordIndices = {
    'IT': { i: 0, j: 0 },
    'IS': { i: 0, j: 3 },

    // Time intervals
    'FIVE (INTERVAL)': { i: 2, j: 7 },
    'TEN (INTERVAL)': { i: 1, j: 9 },
    'QUARTER': { i: 1, j: 0 },
    'TWENTY': { i: 2, j: 0 },
    'HALF': { i: 0, j: 6 },
    'MINUTES': { i: 3, j: 1 },

    // Prepositions
    'TO': { i: 3, j: 9 },
    'PAST': { i: 5, j: 0 },

    // Hours
    'ONE': { i: 8, j: 5 },
    'TWO': { i: 5, j: 9 },
    'THREE': { i: 6, j: 0 },
    'FOUR': { i: 6, j: 7 },
    'FIVE': { i: 7, j: 0 },
    'SIX': { i: 9, j: 1 },
    'SEVEN': { i: 9, j: 5 },
    'EIGHT': { i: 8, j: 0 },
    'NINE': { i: 5, j: 5 },
    'TEN': { i: 8, j: 9 },
    'ELEVEN': { i: 10, j: 6 },
    'TWELVE': { i: 10, j: 0 },
    'O\'CLOCK': { i: 11, j: 5 },

    // The whole point of the clock
    'WEDNESDAY': { i: 4, j: 1 },
    'MY': { i: 7, j: 4 },
    'DUDES': { i: 7, j: 7 },
  };

  public constructor(private titleService: Title) {}

  ngOnInit() {
    for (let row of this.clockRows) {
      let newClockFaceRow: ClockNode[] = [];
      for (let char of row) {
        newClockFaceRow.push(new ClockNode(char));
      }
      this.clockFace.push(newClockFaceRow);
    }

    this.checkTime(new Date());

    setInterval(() => {
      this.checkTime(new Date());
    }, 1000);
  }

  checkTime(date: Date) {

    this.clearAll();

    if (date.getDay() === Days.WEDNESDAY) {
      this.itIsWednesdayMyDudes();
    }
    else {
      this.lightWords('IT', 'IS');

      let minutes = date.getMinutes();
      let hour = date.getHours();

      // IT IS [TIME INTERVAL] [PREPOSITION] [HOUR] [O'CLOCK?]
      // e.g. IT IS [HALF] [PAST] [TEN]
      this.lightTimeInterval(minutes);
      this.lightPreposition(minutes);
      this.lightHour(hour, minutes);
      if (minutes < 5) {
        this.lightWords('O\'CLOCK');
      }
    }
  }

  clearAll() {
    for (let row of this.clockFace) {
      for (let node of row) {
        node.on = false;
      }
    }
  }

  itIsWednesdayMyDudes() {
    this.lightWords('IT', 'IS', 'WEDNESDAY', 'MY', 'DUDES');
  }

  lightTimeInterval(minutes: number) {
    if (minutes >= 55) {
      this.lightWords('FIVE (INTERVAL)', 'MINUTES');
    }
    else if (minutes >= 50) {
      this.lightWords('TEN (INTERVAL)', 'MINUTES');
    }
    else if (minutes >= 45) {
      this.lightWords('QUARTER');
    }
    else if (minutes >= 40) {
      this.lightWords('TWENTY', 'MINUTES');
    }
    else if (minutes >= 30) {
      this.lightWords('HALF');
    }
    else if (minutes >= 25) {
      this.lightWords('TWENTY', 'FIVE (INTERVAL)', 'MINUTES');
    }
    else if (minutes >= 20) {
      this.lightWords('TWENTY', 'MINUTES');
    }
    else if (minutes >= 15) {
      this.lightWords('QUARTER');
    }
    else if (minutes >= 10) {
      this.lightWords('TEN (INTERVAL)', 'MINUTES');
    }
    else if (minutes >= 5) {
      this.lightWords('FIVE (INTERVAL)', 'MINUTES');
    }
  }

  lightPreposition(minutes: number) {
    if (minutes >= 40) {
      this.lightWords('TO');
    }
    else if (minutes >= 5) {
      this.lightWords('PAST');
    }
  }

  lightHour(hour: number, minutes: number) {
    let hoursToWord = {
      0: 'TWELVE',
      1: 'ONE',
      2: 'TWO',
      3: 'THREE',
      4: 'FOUR',
      5: 'FIVE',
      6: 'SIX',
      7: 'SEVEN',
      8: 'EIGHT',
      9: 'NINE',
      10: 'TEN',
      11: 'ELEVEN'
    };

    if (minutes >= 40) {
      this.lightWords(hoursToWord[(hour + 1) % 12])
    }
    else {
      this.lightWords(hoursToWord[hour % 12])
    }
  }

  lightWords(...words: string[]) {
    for (let word of words) {
      this.lightWord(word);
    }
  }

  lightWord(word: string) {
    let indices = this.wordIndices[word];

    let cleanWord = word;
    if (cleanWord.indexOf(' (INTERVAL)') !== -1) {
      cleanWord = cleanWord.substring(0, cleanWord.indexOf(' (INTERVAL)'));
    }

    for (let k = 0; k < cleanWord.length; k++) {
      this.clockFace[indices.i][indices.j + k].on = true;
    }
  }
}
