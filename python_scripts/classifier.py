import sys

from sklearn.externals import joblib

print("works", flush = True)

# clf = joblib.load(sys.argv[1])
# cv = joblib.load(sys.argv[2])



f = open('/home/rachit/Desktop/study/hackathon/python_scripts/file.txt', 'r')
for x in f:
    print(x, flush = True)

f.close()

print("works2", flush = True)
