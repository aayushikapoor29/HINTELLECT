from flask import Flask, request, jsonify
import google.generativeai as ai

app = Flask(__name__)

ai.configure(api_key="")


@app.route('/review', method=['POST'])
def review(code):

    data = request.get_json() 
    code = data.get("code", "")

    if not code:
        return jsonify({"error": "No code provided"}), 400


    prompt = f"""
    give in this format only
    1. Rate the code from 1 to 10 
    2. The language it is written in.
    3. Errors:
        syntax error: if any, list them 
        logical error: if any, explain 
    4. Improvement Hints for the code:
        provide hints to improve in a genz way
        keep them short and clear.
    please see, do not give the code

    Given here is the code {code}

    important, double check syntax correctly
    """

    model = ai.GenerativeModel("gemini-pro")
    try:
        response = model.generate_content(prompt)
        return jsonify({"review": response.result})
    except Exception as e:
        return jsonify({"error":str(e)}), 500
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5004, debug=True)
