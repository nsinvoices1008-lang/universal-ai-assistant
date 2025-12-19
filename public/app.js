// Configuration
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000/api' 
  : '/api';

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  checkSystemStatus();
  loadSystemInfo();
});

// Check system status
async function checkSystemStatus() {
  const statusDot = document.querySelector('.status-dot');
  const statusText = document.querySelector('.status-text');

  try {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/health`);
    const data = await response.json();

    if (data.status === 'healthy') {
      statusDot.style.background = '#10b981';
      statusText.textContent = 'Online';
    } else {
      statusDot.style.background = '#f59e0b';
      statusText.textContent = 'Degraded';
    }
  } catch (error) {
    statusDot.style.background = '#ef4444';
    statusText.textContent = 'Offline';
    console.error('Status check failed:', error);
  }
}

// Load system information
async function loadSystemInfo() {
  try {
    // Load agents
    const agentsResponse = await fetch(`${API_BASE_URL}/agents`);
    const agentsData = await agentsResponse.json();
    document.getElementById('agentCount').textContent = agentsData.agents.length;

    // Load memory stats
    const memoryResponse = await fetch(`${API_BASE_URL}/memory`);
    const memoryData = await memoryResponse.json();
    document.getElementById('memoryUsage').textContent = 
      `${memoryData.shortTermSize}/${memoryData.longTermSize}`;

    // Load models (this might take time, so we'll show a placeholder)
    document.getElementById('modelCount').textContent = '200+';
    
    // API Status
    document.getElementById('apiStatus').textContent = '✓ Ready';
    document.getElementById('apiStatus').style.color = '#10b981';

  } catch (error) {
    console.error('Failed to load system info:', error);
    document.getElementById('agentCount').textContent = 'Error';
    document.getElementById('memoryUsage').textContent = 'Error';
    document.getElementById('modelCount').textContent = 'Error';
    document.getElementById('apiStatus').textContent = '✗ Error';
    document.getElementById('apiStatus').style.color = '#ef4444';
  }
}

// Execute command
async function executeCommand() {
  const input = document.getElementById('commandInput');
  const command = input.value.trim();

  if (!command) {
    showNotification('Please enter a command', 'warning');
    return;
  }

  showLoading(true);

  try {
    const response = await fetch(`${API_BASE_URL}/command`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ command })
    });

    const result = await response.json();
    displayResults(result);
    showNotification('Command executed successfully!', 'success');
  } catch (error) {
    console.error('Command execution failed:', error);
    showNotification('Failed to execute command. Make sure the server is running.', 'error');
    displayResults({
      success: false,
      error: error.message,
      details: 'Make sure the backend server is running on the correct port.'
    });
  } finally {
    showLoading(false);
  }
}

// Display results
function displayResults(result) {
  const resultsSection = document.getElementById('resultsSection');
  const resultsContent = document.getElementById('resultsContent');

  resultsSection.style.display = 'block';
  resultsContent.innerHTML = '';

  // Success status
  const statusItem = createResultItem('Status', result.success ? '✓ Success' : '✗ Failed');
  statusItem.querySelector('.result-value').style.color = result.success ? '#10b981' : '#ef4444';
  statusItem.querySelector('.result-value').style.fontWeight = 'bold';
  resultsContent.appendChild(statusItem);

  // Summary
  if (result.summary) {
    resultsContent.appendChild(createResultItem('Summary', result.summary));
  }

  // Intent
  if (result.intent) {
    resultsContent.appendChild(createResultItem('Intent', JSON.stringify(result.intent, null, 2)));
  }

  // Results
  if (result.results) {
    resultsContent.appendChild(createResultItem('Results', JSON.stringify(result.results, null, 2)));
  }

  // Error
  if (result.error) {
    const errorItem = createResultItem('Error', result.error);
    errorItem.querySelector('.result-value').style.color = '#ef4444';
    resultsContent.appendChild(errorItem);
  }

  // Details
  if (result.details) {
    resultsContent.appendChild(createResultItem('Details', result.details));
  }

  // Timestamp
  if (result.timestamp) {
    const date = new Date(result.timestamp);
    resultsContent.appendChild(createResultItem('Timestamp', date.toLocaleString()));
  }

  // Scroll to results
  resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Create result item
function createResultItem(label, value) {
  const item = document.createElement('div');
  item.className = 'result-item';

  const labelDiv = document.createElement('div');
  labelDiv.className = 'result-label';
  labelDiv.textContent = label;

  const valueDiv = document.createElement('div');
  valueDiv.className = 'result-value';
  valueDiv.textContent = typeof value === 'string' ? value : JSON.stringify(value, null, 2);

  item.appendChild(labelDiv);
  item.appendChild(valueDiv);

  return item;
}

// Close results
function closeResults() {
  document.getElementById('resultsSection').style.display = 'none';
}

// Clear command
function clearCommand() {
  document.getElementById('commandInput').value = '';
  closeResults();
}

// Quick command
function quickCommand(command) {
  document.getElementById('commandInput').value = command;
  executeCommand();
}

// Show loading overlay
function showLoading(show) {
  document.getElementById('loadingOverlay').style.display = show ? 'flex' : 'none';
}

// Show notification
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    border-radius: 10px;
    color: white;
    font-weight: 600;
    z-index: 2000;
    animation: slideInRight 0.3s ease-out;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  `;

  // Set color based on type
  const colors = {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#667eea'
  };
  notification.style.background = colors[type] || colors.info;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Keyboard shortcuts
document.getElementById('commandInput').addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'Enter') {
    executeCommand();
  }
});

// Auto-refresh system info every 30 seconds
setInterval(() => {
  checkSystemStatus();
  loadSystemInfo();
}, 30000);
