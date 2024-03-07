document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const analyzeButton = document.getElementById('analyze-button');
    const emotionResult = document.getElementById('emotion');
    const sentimentResult = document.getElementById('sentiment');

    analyzeButton.addEventListener('click', async () => {
        const text = textInput.value;

        // Emotion Analysis Request
        const emotionOptions = {
            method: 'POST',
            url: 'https://twinword-emotion-analysis-v1.p.rapidapi.com/analyze/',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': 'key',
                'X-RapidAPI-Host': 'twinword-emotion-analysis-v1.p.rapidapi.com',
            },
            data: new URLSearchParams({ text }),
        };

        // Sentiment Analysis Request
        const sentimentOptions = {
            method: 'GET',
            url: 'https://twinword-sentiment-analysis.p.rapidapi.com/analyze/',
            params: {
                text,
            },
            headers: {
                'X-RapidAPI-Key': 'key',
                'X-RapidAPI-Host': 'twinword-sentiment-analysis.p.rapidapi.com',
            },
        };

        try {
            // Emotion Analysis
            const emotionResponse = await axios.request(emotionOptions);
            const detectedEmotions = emotionResponse.data.emotions_detected;
            
            if (detectedEmotions.length > 0) {
                emotionResult.innerHTML = `Emotion Detected: <br>${detectedEmotions.join('<br>')}`;
            } else {
                emotionResult.textContent = 'No emotions detected.';
            }

            // Sentiment Analysis
            const sentimentResponse = await axios.request(sentimentOptions);
            const sentimentScore = sentimentResponse.data.score;
            const sentimentType = sentimentResponse.data.type;

            sentimentResult.innerHTML = `Sentiment Detected: <br>${sentimentType}`;

        } catch (error) {
            console.error(error);
        }
    });
});
