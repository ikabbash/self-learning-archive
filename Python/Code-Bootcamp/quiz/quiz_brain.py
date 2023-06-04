class QuizBrain:

    def __init__(self, q_list):
        self.q_number = 0
        self.q_list = q_list
        self.score = 0

    def still_has_questions(self):
        return self.q_number < len(self.q_list)

    def next_question(self):
        current_q = self.q_list[self.q_number]
        self.q_number+=1
        user_answer = input(f"Q.{self.q_number}: {current_q.question} (True/False): ")
        self.check_answer(user_answer, current_q.answer)

    def check_answer(self, user_answer, correct_answer):
        if user_answer.lower() == correct_answer.lower():
            self.score += 1
            print(f"Correct, score: {self.score} out of {self.q_number}\n")
        else:
            print(f"Incorrect, score: {self.score} out of {self.q_number}\n")
