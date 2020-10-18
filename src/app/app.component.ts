import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rxjs';
  hashValue: any;
  output1: any[];
  output2: any[];
  output3: any[];

  constructor() {
  }

  handleStringValueFromHash(hash: bigint, length: number, id) {
    let output = [];
    this.hashToString(hash, "acdegilmnoprstuw", "", length, output);
    switch(id) {
      case 1:
        this.output1 = output;
        break;
      case 2:
        this.output2 = output;
        break;
      case 3:
        this.output3 = output;
        break;
    }
  }

  setHashToString(s: string) {
    this.hashValue = this.stringToHash(s);
  }

  // 9007199254740991
  // 1317985395604951854
  hashToString(hash: bigint, letters: string, added: string, length: number, output) {
    const hashNumber = Number(hash)
    if (!Number.isSafeInteger(hashNumber) || hash < 7) {
      return
    }

    if (length == 0 && hashNumber == 7) {
      output.push(added);
      return
    }

    for (let i = 0; i < letters.length; i++) {
      let tmp = (hashNumber - i) / 37;
      if (tmp % 1 == 0) {
        let newHash: bigint = BigInt((hashNumber - i) / 37);
        this.hashToString(newHash, letters, letters[i] + added, length - 1, output)
      }
    }
  }

  // Need to return int64
  stringToHash(s: string) {
    let h: bigint = BigInt(7);
    const letters = "acdegilmnoprstuw";
    for (let i = 0; i < s.length; i++) {
      h =  h * BigInt(37) + BigInt(letters.indexOf(s[i]));
    }
    return h;
  }

 

  

  ngOnInit() {
  }

}
