// synapse.js - DNA -> replication -> transcription -> translation
// Run with: node synapse.js

const readline = require('readline');

// ---------- Helper functions ----------

// Check whether the base is valid (returns uppercase base, or 'X' if invalid)
function dna(base) {
  base = base.toUpperCase();
  return 'ATGC'.includes(base) ? base : 'X';
}

// Complementary DNA base
function complement(base) {
  const map = { A: 'T', T: 'A', G: 'C', C: 'G' };
  return map[base] || 'X';
}

// DNA base -> mRNA base
function transcription(base) {
  const map = { A: 'U', T: 'A', G: 'C', C: 'G' };
  return map[base] || 'X';
}

// Codon table: amino acid -> list of codons
const CODON_GROUPS = {
  'Methionine (START)': ['AUG'],
  'Phenylalanine': ['UUU', 'UUC'],
  'Leucine': ['UUA', 'UUG', 'CUU', 'CUC', 'CUA', 'CUG'],
  'Isoleucine': ['AUU', 'AUC', 'AUA'],
  'Valine': ['GUU', 'GUC', 'GUA', 'GUG'],
  'Serine': ['UCU', 'UCC', 'UCA', 'UCG', 'AGU', 'AGC'],
  'Proline': ['CCU', 'CCC', 'CCA', 'CCG'],
  'Threonine': ['ACU', 'ACC', 'ACA', 'ACG'],
  'Alanine': ['GCU', 'GCC', 'GCA', 'GCG'],
  'Tyrosine': ['UAU', 'UAC'],
  'STOP': ['UAA', 'UAG', 'UGA'],
  'Histidine': ['CAU', 'CAC'],
  'Glutamine': ['CAA', 'CAG'],
  'Asparagine': ['AAU', 'AAC'],
  'Lysine': ['AAA', 'AAG'],
  'Aspartic Acid': ['GAU', 'GAC'],
  'Glutamic Acid': ['GAA', 'GAG'],
  'Cysteine': ['UGU', 'UGC'],
  'Tryptophan': ['UGG'],
  'Arginine': ['CGU', 'CGC', 'CGA', 'CGG', 'AGA', 'AGG'],
  'Glycine': ['GGU', 'GGC', 'GGA', 'GGG'],
};

// Flatten into a codon -> amino acid lookup
const CODON_TABLE = {};
for (const [aminoAcid, codons] of Object.entries(CODON_GROUPS)) {
  for (const codon of codons) CODON_TABLE[codon] = aminoAcid;
}

function translation(codon) {
  return CODON_TABLE[codon] || 'INVALID CODON';
}

const STOP_CODONS = ['UAA', 'UAG', 'UGA'];

// ---------- Input handling (whitespace-separated tokens, like Java's Scanner) ----------

const rl = readline.createInterface({ input: process.stdin });
const lineIterator = rl[Symbol.asyncIterator]();
let tokenBuffer = [];

async function nextToken(prompt) {
  if (prompt) process.stdout.write(prompt);
  while (tokenBuffer.length === 0) {
    const { value, done } = await lineIterator.next();
    if (done) throw new Error('Input ended unexpectedly.');
    tokenBuffer = value.trim().split(/\s+/).filter(Boolean);
  }
  return tokenBuffer.shift();
}

// ---------- Main ----------

async function main() {
  // Read the number of bases
  let n;
  while (true) {
    const raw = await nextToken('ENTER THE NO. OF BASES : ');
    n = Number(raw);
    if (Number.isInteger(n) && n > 0) break;
    console.log('PLEASE ENTER A POSITIVE WHOLE NUMBER!');
  }

  console.log('ENTER THE BASES OF ONE STRAND : ');

  // Read and validate DNA bases (first character of each token)
  const str = [];
  while (str.length < n) {
    const base = dna((await nextToken()).charAt(0));
    if (base === 'X') {
      console.log('INVALID DNA BASE!');
      continue; // ask for the same position again
    }
    str.push(base);
  }
  rl.close();

  const comp = str.map(complement);
  const transc = str.map(transcription);
  const mrna = transc.join('');

  console.log(`\nYOUR ENTERED DNA SEQUENCE IS : ${str.join('')}`);
  console.log(`DNA SEQUENCE AFTER REPLICATION IS : ${comp.join('')}`);
  console.log(`DNA SEQUENCE AFTER TRANSCRIPTION IS : ${mrna}`);

  // Split mRNA into complete codons (any leftover 1-2 bases are ignored)
  const codons = [];
  for (let i = 0; i + 2 < n; i += 3) codons.push(mrna.slice(i, i + 3));

  console.log(`CODONS(group of 3 bases) : ${codons.join(' ')}`);
  if (n % 3 !== 0) {
    console.log(`(NOTE: ${n % 3} leftover base(s) ignored - not a full codon)`);
  }

  console.log('\nCHECKING CODONS:');
  for (const codon of codons) {
    if (codon === 'AUG') console.log('AUG -> START CODON');
    else if (STOP_CODONS.includes(codon)) console.log(`${codon} -> STOP CODON`);
    else console.log(`${codon} -> NORMAL CODON`);
  }

  console.log('\nTRANSLATION:');

  // Find the first AUG at any position, then read in triplets from there
  const start = mrna.indexOf('AUG');
  if (start === -1) {
    console.log('NO START CODON (AUG) FOUND.');
    return;
  }

  for (let i = start; i + 2 < n; i += 3) {
    const codon = mrna.slice(i, i + 3);
    console.log(`${codon} -> ${translation(codon)}`);
    if (STOP_CODONS.includes(codon)) break;
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});