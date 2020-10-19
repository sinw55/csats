import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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
  error: any;
  @ViewChild('hash1') hash1: ElementRef;
  @ViewChild('hash2') hash2: ElementRef;
  @ViewChild('hash3') hash3: ElementRef;

  constructor() {
  }

  handleStringValueFromHash(hash: bigint, length: number, id) {
    let output = [];
    this.error = {1: '', 2: '', 3: ''};
    
    try {
      this.hashToString(hash, "acdegilmnoprstuw", "", length, output);
    } catch(e) {
      this.error[id] = "Not safe interger";
    }
    

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
      throw new Error('Not safe integer');
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
