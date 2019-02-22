from re import match
from random import randint
from math import floor

def f(x):
  # indices of alphabet
  indices = {'X': 24, 'F': 6, 'A': 1, 'Q': 17, 'D': 4, 'S': 19, 'U': 21, 'M': 13, 'L': 12, 'H': 8, 'Z': 26, 'E': 5, 'N': 14, 'V': 22, 'P': 16, 'R': 18, 'G': 7, 'C': 3, 'I': 9, 'B': 2, 'K': 11, 'O': 15, 'T': 20, 'J': 10, 'Y': 25, 'W': 23}
  
  if x in indices:
    return indices[x]

def h(name, buckets):
  h = 0
  name = name.upper()

  # iterate each char and add it's index to overall hash
  # if it exceeds the number of buckets used, mod buckets to "reset number"
  for char in name:
    h += f(char)
    h %= buckets

  return h

if __name__ == '__main__':
  content = []
  hashes = []

  # Get lines from names file
  with open('names.txt') as fin:
    content = fin.readlines()

  # Strip newline chars and extract string from each line
  content = [match('[a-zA-Z]+',x.strip()).group(0) for x in content]

  length = len(content)
  half = int(floor(length / 2))

  # get hashes for a random distribution of names
  for i in range(half):
    rand = randint(0, length - 1)
    hashes.append(h(content[rand], 175))

  # write the hases to an output file
  with open('hashes.txt','w') as out:
    for item in hashes:
      out.write(str(item) + ',\n')

  print("Done")