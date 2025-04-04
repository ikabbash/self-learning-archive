from question_model import Question
from data import question_data
from quiz_brain import QuizBrain

question_bank = []

#the object here acts as a pipeline between question_bank and question_data to convert the data
for question in question_data: 
    qt_text = question["text"]
    qt_answer = question["answer"]
    new_qt = Question(qt_text, qt_answer)
    #print(new_qt.question)
    question_bank.append(new_qt) #each question & answer is in an object and each object is stored here

quiz = QuizBrain(question_bank)

while quiz.still_has_questions():
    quiz.next_question()

print(f"You've completed the squiz with a score of {quiz.score} out of {quiz.q_number}")