const form = document.getElementById('productForm');
const loading = document.getElementById('loading');
const output = document.getElementById('output');
const outputSection = document.getElementById('outputSection');
const errorDiv = document.getElementById('error');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const apiKey = document.getElementById('apiKey').value.trim();
    const problemStatement = document.getElementById('problemStatement').value.trim();

    if (!apiKey || !problemStatement) {
        showError('Please fill in all fields');
        return;
    }

    showLoading();
    clearError();

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                model: 'claude-opus-4-1',
                max_tokens: 4000,
                messages: [
                    {
                        role: 'user',
                        content: generatePrompt(problemStatement),
                    },
                ],
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'API request failed');
        }

        const data = await response.json();
        const productPlan = data.content[0].text;

        displayOutput(productPlan);
        hideLoading();
    } catch (error) {
        hideLoading();
        showError(error.message);
    }
});

function generatePrompt(problemStatement) {
    return `You are an expert AI Product Manager. Based on the following product idea or problem statement, generate a comprehensive product development plan.

Problem Statement / Product Idea:
${problemStatement}

Please provide a structured plan that includes:

1. **Executive Summary** - A concise overview of the product concept

2. **Problem Statement** - Deep dive into the problem being solved

3. **Target Users** - Primary and secondary user personas

4. **Core Features** - Key features and their descriptions

5. **Success Metrics** - KPIs to measure product success

6. **Development Roadmap** - Phased development plan with milestones

7. **Technology Stack** - Recommended tech for implementation

8. **Business Model** - How the product will generate value

9. **Risk Assessment** - Potential risks and mitigation strategies

10. **Next Steps** - Immediate action items to get started

Format the response in clear markdown with proper headings and bullet points. Be specific and actionable.`;
}

function displayOutput(content) {
    output.innerHTML = marked(content);
    outputSection.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showLoading() {
    loading.style.display = 'block';
    outputSection.style.display = 'block';
}

function hideLoading() {
    loading.style.display = 'none';
}

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
}

function clearError() {
    errorDiv.classList.remove('show');
}

function resetForm() {
    form.reset();
    outputSection.style.display = 'none';
    clearError();
    document.getElementById('apiKey').focus();
}

// Simple markdown parser (basic)
function marked(text) {
    let html = text
        .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
        .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
        .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^\- (.*?)$/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
        .replace(/^\d+\. (.*?)$/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^(?!<[a-z])/gm, '<p>')
        .replace(/$/gm, '</p>')
        .replace(/<p><\/p>/g, '');

    return html;
}
