const fill = " ";
const simbol = "#";

function createMatrix (M, n) {
  const sub = [];
  for (let i = 0; i < n; i++) {
    sub.push(fill);
  }
  for (let i = 0; i < n; i++) {
    M.push([...sub]);
  }
}

function fillMatrix (M) {
  M[0] = M[0].map(() => simbol);
  M[M.length-1] = M[0];

  M.forEach((e, i) => {
    if (i !== 0 && i !== M.length-1)  {
      M[i][0] = simbol;
      M[i][e.length-1] = simbol;
      
      M[i][i] = simbol;
      M[i][(e.length-1) - i] = simbol;
    }
  });
}

function fillEmisphere (M, bottom, middle) {
  M.forEach((e, i) => {
    if (!bottom && i <= middle) {
      M[i] = e.map((subE, subI) => {
        if (subI > i && subI < e.length-1-i) {
          return simbol;
        } else {
          return subE;
        }
      });
    } else if (bottom && i > middle) {
      M[i] = e.map((subE, subI) => {
        if (subI > e.length-1-i && subI < i) {
          return simbol;
        } else {
          return subE;
        }
      });
    }
  });
} 

function printMatrix (M, n) {
  M.forEach(e => console.log(e.join('')));
  console.log(`n = ${n}`)
}

const n = parseInt(process.argv[2]);
const middle = parseInt(n/2);

const M = [];
createMatrix(M, n);    
fillMatrix(M);
fillEmisphere(M, false, middle);
printMatrix(M, n);