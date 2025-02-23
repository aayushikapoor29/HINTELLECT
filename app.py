from flask import Flask, request, jsonify
import google.generativeai as ai

from flask_cors import CORS


app = Flask(__name__)
CORS(app)

ai.configure(api_key="AIzaSyAaPxa09mmfgTA8Fl6DhKD5TWVpvR57xhk")


@app.route('/main', methods=['POST'])
def review_code():
    data = request.get_json() 
    code = data.get('code')


    if not code:
        return jsonify({"error": "No code provided"}), 400


    prompt = f"""
    give in this format only
    1. Rate the code from 1 to 5. give a number strictly
    2. The language it is written in.
    3. Errors:
        syntax error: if any, list them 
        logical error: if any, explain 
    4. Improvement Hints for the code:
        provide hints to improve in a genz way but a little formal too.
        keep them short and clear.
    please see, do not give the code

    Given here is the code {code}

    review the errors again, about brackets, semicolons, operators etc
    important, tripless check syntax correctly 
    """

    model = ai.GenerativeModel("gemini-pro")
    try:
        response = model.generate_content(prompt)

        return jsonify({"review": response.text})
    except Exception as e:
        print("Error occurred:", str(e)) 
        return jsonify({"error":str(e)}), 500
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5004, debug=True)

