<!--
Simplified options page - no complex settings needed
-->

<script lang="ts">
  import { getMessage } from '@/helpers';
</script>

<svelte:head>
  <title>{getMessage('extensionName')} - Simple</title>
</svelte:head>

<main>
  <h1>{getMessage('extensionName')}</h1>
  <div class="content">
    <p>This extension has been simplified to focus on core functionality.</p>
    <p>All settings are available directly in the popup - click the extension icon to access them.</p>
    
    <div class="features">
      <h2>Available Controls:</h2>
      <ul>
        <li>✅ Enable/Disable toggle</li>
        <li>🔉 Volume threshold (speech detection)</li>
        <li>▶️ Playback speed for speech</li>
        <li>⏱️ Margins before and after speech</li>
        <li>📊 Real-time sound visualization</li>
      </ul>
    </div>

    <div class="algorithm-info">
      <h2>Algorithm:</h2>
      <p>Always uses the experimental stretching algorithm for the best audio quality.</p>
    </div>
  </div>
</main>

<style>
  :root {
    --main-padding: 1rem;
    --content-max-width: 48rem;
  }
  
  main {
    padding: 0 var(--main-padding);
    max-width: var(--content-max-width);
    margin: 0 auto;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
  }
  
  h1 {
    color: #333;
    border-bottom: 2px solid #007acc;
    padding-bottom: 0.5rem;
  }
  
  .content {
    margin-top: 2rem;
  }
  
  .features, .algorithm-info {
    background: #f5f5f5;
    padding: 1rem;
    border-radius: 0.5rem;
    margin: 1rem 0;
  }
  
  .features h2, .algorithm-info h2 {
    margin-top: 0;
    color: #555;
  }
  
  ul {
    list-style-type: none;
    padding-left: 0;
  }
  
  li {
    padding: 0.25rem 0;
  }
</style>