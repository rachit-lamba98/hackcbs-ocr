#!/usr/bin/env python
# coding: utf-8

import numpy as np
import pandas as pd
import nltk
from nltk.corpus import words
import warnings

warnings.filterwarnings("ignore")

data = pd.read_csv('final.csv')

data = data.dropna(how='any', axis=0)

from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(data.iloc[:,0], data.iloc[:, 1], test_size=0.33, random_state=1)

from sklearn.feature_extraction.text import CountVectorizer

cv = CountVectorizer(binary=True)
cv.fit(X_train)

X_train = cv.transform(X_train)
X_test = cv.transform(X_test)

from sklearn.linear_model import LogisticRegression
# from sklearn.metrics import accuracy_score
# from sklearn.metrics import f1_score, recall_score

# f1Score = {}
# for c in [0.01, 0.05, 0.1, 0.25, 0.5, 0.75, 1, 2, 3, 4, 5, 6]:
#     test_model = LogisticRegression(C = c)
#     test_model.fit(X_train, y_train)
#     test_pred = test_model.predict(X_test)
#     f1Score[c] = f1_score(y_test, test_pred)
#

lr = LogisticRegression(C = 6)
lr.fit(X_train, y_train)

# inp = [sys.argv[1]]
# inp = cv.transform(inp)
#
# prediciton = lr.predict(inp)
# output = {'Prediction': prediciton}
# print(output)

from sklearn.externals import joblib

filename1 = './models/clf.joblib'
_ = joblib.dump(lr, filename1)
filename2 = './models/cv.joblib'
_ = joblib.dump(cv, filename2)  
