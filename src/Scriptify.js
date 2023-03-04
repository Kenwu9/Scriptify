import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
// import TopBanner from './TopBanner';

function Scriptify() {
  const [description, setDescription] = useState('');
  const [tone, setTone] = useState('Excited');
  const [quality, setQuality] = useState('Good');
  const [numberOfResults, setNumberOfResults] = useState(3);
  const [results, setResults] = useState([]);
  const [template, setTemplate] = useState('Instagram Post');
  const [isGenerating, setIsGenerating] = useState(false); //Loading sign when generating
  const handleCopyResult = (result) => {
    navigator.clipboard.writeText(result);
  }
  
  const handleDeleteResult = (index) => {
    setResults(results.filter((_, i) => i !== index));
  }

  function handleGenerate() {
    setIsGenerating(true);
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleToneChange = (event) => {
    setTone(event.target.value);
  };

  const handleQualityChange = (event) => {
    setQuality(event.target.value);
  };

  const handleNumberOfResultsChange = (event) => {
    setNumberOfResults(parseInt(event.target.value));
  };

  const handleTemplateChange = (event) => {
    setTemplate(event.target.value);
  };  

// ===================================================
//              Submitting prompt
// ===================================================
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check for empty description.
    if (description.trim() === '') {
      alert('Please enter a description');
      return;
    }
    setIsGenerating(true); // Set loading state
    const configuration = new Configuration({
      apiKey: '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',
    });
    const openai = new OpenAIApi(configuration);

    let model = '';
    if (quality === 'Economic') {
      model = 'text-babbage-001';
    } else if (quality === 'Good') {
      model = 'text-curie-001';
    } else if (quality === 'Premium') {
      model = 'text-davinci-003';
    }

    const prompts = Array(numberOfResults).fill(description);
    const responses = await Promise.all(
      prompts.map(async (prompt) => {
        let promptText = '';
        if (template === 'Instagram Posts') {
          promptText = "Generate a short Instagram post using the following description: \n\n" + prompt + '\nTone: ' + tone + '\nUse emojis, hashtags. \nResponse: ';
        } 
        else if (template === 'LinkedIn Posts') {
          promptText = "Generate a LinkedIn post using the following description: \n\n" + prompt + '\nTone: ' + tone + '\nUse hashtags.'
          + '\nResponse: ';
        }
        else if (template === 'Twitter Posts') {
          promptText = "Generate a Twitter post using the following description: \n\n" + prompt + '\nTone: ' + tone + '\nUse hashtags.'
          + '\nResponse: ';
        }
        else if (template === 'Blog Posts') {
          promptText = "Generate a blog post using the following description: \n\n" + prompt + '\nTone: ' + tone
          + '\nResponse: ';
        }
        else if (template === 'Brand Slogans') {
          promptText = "Generate a viral Brand Slogan using the following description: \n\n" + prompt + '\nTone: ' + tone
          + '\nResponse: ';
        }
        else if (template === 'Website Descriptions') {
          promptText = "Generate an SEO-refined website description using the following description: \n\n" + prompt + '\nTone: ' + tone
          + '\nResponse: ';
        }
        else if (template === 'Product Descriptions') {
          promptText = "Generate a highly-effective product description using the following information: \n\n" + prompt + '\nTone: ' + tone 
          + '\nResponse: ';
        } 
        else if (template === 'Email Subject Lines') {
          promptText = "Generate a unique, catchy, and high-converting email subject line using the following product/service description: \n\n" + 
          prompt + '\nTone: ' + tone + '\nResponse: ';
        } 
        else if (template === 'Sales Emails') {
          promptText = "Generate a high-converting sales email using the following product/service description: \n\n" + prompt + '\nTone: ' + tone 
          + '\nInclude a subject line and politely request for a meeting to discuss further. \nResponse: ';
        } 
        else if (template === 'Welcome Emails') {
          promptText = "Generate a genuine welcome email using the following information: \n\n" + prompt + '\nTone: ' + tone 
          + '\nInclude a subject line. \nResponse: ';
        }
        else if (template === 'Confirmation Emails') {
          promptText = "Generate a confirmation email using the following requirements: \n\n" + prompt + '\nTone: ' + tone 
          + '\nInclude a subject line and kindly thank the user at the end. \nResponse: ';
        } 
        else if (template === 'Cancellation Emails') {
          promptText = "Generate a warm and genuine cancellation email for when a user cancels with us. Use the following description: \n\n" + prompt + '\nTone: ' + tone 
          + '\nInclude a subject line and kindly thank the user at the end. \nResponse: ';
        } 
        else if (template === 'Follow-up Emails') {
          promptText = "Generate a highly effective follow-up email using the following information: \n\n" + prompt + '\nTone: ' + tone 
          + '\nInclude a subject line and offer assistance at the end. \nResponse: ';
        }
        else if (template === 'Thank You Emails') {
          promptText = "Generate a genuine thank you email using the following information: \n\n" + prompt + '\nTone: ' + tone 
          + '\nInclude a subject line. \nResponse: ';
        }
        else if (template === 'Cover Letters') {
          promptText = "Generate a highly unique cover letter using the following description: \n\n" + prompt + '\nTone: ' + tone + 
          '\nInclude date and receiver address in square-bracket placeholders. \nResponse: ';
        } 
        else if (template === 'Text Summary') {
          promptText = "Summarise the following text: \n\n" + prompt + '\nTone: ' + tone + 
          '\nResponse: ';
        }
        
        const response = await openai.createCompletion({
          model: model,
          prompt: promptText,
          temperature: 0.4,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        return response.data.choices[0].text;
      })
    );
    setResults(responses);
    setIsGenerating(false); // Set loading state to false
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <h3>Scriptify</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-group-item">
              <label className="input-label" htmlFor="template-select">
                Choose a Template:
              </label>
              <div className="select-wrapper">
                <select value={template} onChange={handleTemplateChange}>
                  <optgroup label="Social Media">
                    <option value="Instagram Posts">Instagram Posts</option>
                    <option value="LinkedIn Posts">LinkedIn Posts</option>
                    <option value="Twitter Posts">Twitter Posts</option>
                  </optgroup>
                  <optgroup label="Content Writing">
                    <option value="Blogposts">Blogposts</option>
                    <option value="Brand Slogans">Brand Slogans</option>
                    <option value="Website Descriptions">Website Descriptions</option>
                    <option value="Product Descriptions">Product Descriptions</option>
                  </optgroup>
                  <optgroup label="Emails">
                    <option value="Email Subject Lines">Email Subject Lines</option>
                    <option value="Sales Emails">Sales Emails</option>
                    <option value="Welcome Emails">Welcome Emails</option>
                    <option value="Confirmation Emails">Confirmation Emails</option>
                    <option value="Cancellation Emails">Cancellation Emails</option>
                    <option value="Follow-up Emails">Follow-up Emails</option>
                    <option value="Thank You Emails">Thank You Emails</option>
                  </optgroup>
                  <optgroup label="Letters">
                    <option value="Cover Letters">Cover Letters</option>
                  </optgroup>
                  <optgroup label="Others">
                    <option value="Text Summary">Text Summary</option>
                  </optgroup>
                </select>
              </div>
            </div>
            <label>
              <label className="input-label" htmlFor="description">
                Descripton:<span className="required">*</span>
              </label> 
              <textarea
                placeholder='Scriptify helps you create high-performing, original content for your website, blogposts, and social media campaigns in seconds.'
                value={description} 
                onChange={handleDescriptionChange}
              />
            </label>
            <div className="input-group-item">
              <label className="input-label" htmlFor="tone-select">
                Tone of Voice:
              </label>
              <div className="select-wrapper">
                <select id="tone-select" value={tone} onChange={handleToneChange}>
                  <option value="Excited">Excited</option>
                  <option value="Professional">Professional</option>
                  <option value="Funny">Funny</option>
                  <option value="Witty">Witty</option>
                  <option value="Persuasive">Persuasive</option>
                  <option value="Peaceful">Peaceful</option>
                  <option value="Friendly">Friendly</option>
                  <option value="Loving">Loving</option>
                  <option value="Encouraging">Encouraging</option>
                  <option value="Dramatic">Dramatic</option>
                  <option value="Sarcastic">Sarcastic</option>
                  <option value="Engaging">Engaging</option>
                </select>
              </div>
            </div>
            <div className="input-group-item">
              <label className="input-label" htmlFor="quality-select">
                Quality:
              </label>
              <div className="select-wrapper">
                <select value={quality} onChange={handleQualityChange}>
                  <option value='Economic'>Economic</option>
                  <option value='Good'>Good</option>
                  <option value='Premium'>Premium</option>
                </select>
              </div>   
            </div>
            <div className="input-group-item">
              <label>
                Number of copies:
                <input 
                  type="number" 
                  min="1" 
                  max="5" 
                  value={numberOfResults} 
                  onChange={handleNumberOfResultsChange} 
                />
              </label>
            </div>
          </div>
          <button onClick={handleGenerate} type='submit'>Generate</button>
            {isGenerating && (
              <div className="loading">
                <span>Generating content</span>
                <span className="dots">......</span>
                <span className="spinner"></span>
              </div>
            )}  
        </form>
      </div>
      {/* <TopBanner /> */}
      <div className="main-content"> 
        <div className="result-container">
          {results.map((result, index) => (
            <div className="result-block" key={index}>
              <p>{result}</p>
              <div className="result-item">
                <div className="result-meta">
                  {result.split(' ').length} words / {result.length} characters
                </div>
                <div className="result-actions-container">
                  <button className="result-actions" onClick={() => handleCopyResult(result)}>Copy</button>
                  <button className="result-actions" onClick={() => handleDeleteResult(index)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );  
  // NEED TO CHECK WHETHER RESULTS HAVE BEEN GENEREATED TO SET isGenerating
              //to false!!!!!!!!!!!!!!!!!!!!
}
export default Scriptify;

//TEST ONLY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const prompt = "Generate a short instagram post with the following descriptions:" +
"\nA new icecream flavour for an ice cream shop. It is fantastic and everyone loves it." + 
"\nTone: Excited" + 
"\nUse emojis, hashtags";
const engine = "text-davinci-003";
const apiKey = "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";
const apiUrl = "https://api.openai.com/v1/engines/" + engine + "/completions";
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + apiKey,
};
const data = JSON.stringify({
  prompt: prompt,
  max_tokens: 256,
  temperature: 0.7,
  n: 1,
  stop: "\n",
});
fetch(apiUrl, {
  method: "POST",
  headers: headers,
  body: data,
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Prompt: " + prompt);
    console.log("Response: " + data.choices[0].text.trim());
  })
  .catch((error) => console.error(error));

//---------------------------------------------