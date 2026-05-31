import { Download } from 'lucide-react';
import CodeSnippet from '../components/CodeSnippet';
import './ProjectDetail.css';

const EWSProject = () => {
  const codeSnippet1 = `public SmartLight FindCounterMeasure(Vector3 playersLKP, float currentLightLevel)
{
    bool matchFound = false;
    
    // Phase 1 & 2: Reflection Delay & Contextual Proximity Check
    foreach (var failure in _failureMemory)
    {
        // Simulate cognitive processing: ignore memories younger than 5 seconds
        if (Time.time - failure.TimeStamp < 5.0f) continue;

        float dist = Vector3.Distance(playersLKP, failure.Location);
        if (dist < 10f)
        {
            matchFound = true;
            break;
        }
    }

    if (!matchFound) return null;

    // Phase 3: Affordance Targeting (Find and manipulate the environment)
    Collider[] hits = Physics.OverlapSphere(playersLKP, MaxDistanceToSwitch, SmartObjectLayer);
    float closestDist = float.MaxValue;
    SmartLight bestSwitch = null;

    foreach (var hit in hits)
    {
        SmartLight lightSwitch = hit.GetComponent<SmartLight>();
        if (lightSwitch != null && !lightSwitch.IsOn)
        {
            float d = Vector3.Distance(playersLKP, lightSwitch.transform.position);
            if (d < closestDist)
            {
                closestDist = d;
                bestSwitch = lightSwitch;
            }
        }
    }
    
    return bestSwitch;
}`;

  const codeSnippet2 = `public static class EventBus
{
    private static readonly Dictionary<Type, Delegate> _subscribers = new Dictionary<Type, Delegate>();

    public static void Subscribe<T>(Action<T> handler) where T : IEvent
    {
        var type = typeof(T);
        if (!_subscribers.ContainsKey(type)) _subscribers[type] = null;
        
        _subscribers[type] = (Action<T>)_subscribers[type] + handler;
    }
}

// Inside TelemetrySystem.cs
private void InternalReport(string fileName, string data)
{
    if (_fileBuffers.ContainsKey(fileName))
    {
        string time = Time.time.ToString("F2");
        _fileBuffers[fileName].AppendLine($"{time},{data}");
    }
}

void Update()
{
    // Batch file writing to prevent frame-rate hitches during gameplay
    if (Time.time - _lastWriteTime > 2.0f)
    {
        FlushAllToDisk();
        _lastWriteTime = Time.time;
    }
}`;

  return (
    <div className="project-detail-page">
      {/* Hero Section */}
      <section className="project-detail-hero">
        <div className="project-detail-hero-bg" style={{ backgroundImage: 'url(/images/eyes_wide_shut.webp)' }} />
        <div className="project-detail-hero-overlay" />
        
        <div className="project-detail-hero-content container">
          <h1 className="project-detail-title">Eyes Wide Shut</h1>
          <p className="project-detail-subtitle">Adaptive Stealth AI</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="project-detail-content container">
        
        {/* Overview Section - Embedded Content */}
        <section className="project-section">
          <h2 className="section-title">Project Overview</h2>
          <div className="section-content">
            <p>
              <strong>"Eyes Wide Shut"</strong> is an adaptive stealth AI project designed to break the deterministic "exploitation loops" inherent in traditional Finite State Machines (FSMs). Rather than relying on predictable patrol routes or static search timers, the AI actively learns from player evasion tactics in real-time, forcing players to constantly evolve their gameplay.
            </p>

            <div className="project-image-container">
              <img
                src="/files/docs/ews/EnemyControllerArchitectureOverview.png"
                alt="Enemy Controller Architecture Overview"
                className="project-detail-image"
              />
            </div>
            
            <p>
              At the core of the project is a custom hybrid architecture merging a decoupled Object-Oriented FSM with a Case-Based Reasoning (CBR) memory buffer. When the AI loses visual contact with the player, it stamps environmental data, such as coordinates and light levels, into a lightweight memory struct. During subsequent encounters, the AI queries this localised memory bank to autonomously find and trigger environmental counter-measures (like turning on lights), achieving "one-shot learning" without the massive performance overhead of Neural Networks.
            </p>

            <CodeSnippet
              title='The "One-Shot" Adaptation Algorithm (CBR Retrieval)'
              code={codeSnippet1}
              language="csharp"
            />
            
            <p>
              To ensure the AI's adaptations felt earned rather than scripted, I engineered a physics-based analogue sensory model governed by the Inverse Square Law. The entire system was validated using a custom Event-Driven telemetry pipeline, which batched and serialized performance data to CSVs in the background, ensuring a highly optimized, scalable architecture.
            </p>

            <CodeSnippet
              title="Event-Driven Telemetry (Decoupled Data Logging)"
              code={codeSnippet2}
              language="csharp"
            />
          </div>
        </section>

        {/* Documentation Section */}
        <section className="project-section">
          <h2 className="section-title">Full Dissertation</h2>
          
          <div className="pdf-viewer-container">
            <div className="pdf-controls">
              <a
                href="/files/docs/ews/Dissertation.pdf"
                className="pdf-download-btn"
                download
              >
                <Download size={20} />
                Download PDF
              </a>
            </div>
            
            <div className="pdf-preview pdf-preview-desktop">
              <iframe
                src="/files/docs/ews/Dissertation.pdf#toolbar=0"
                title="Eyes Wide Shut Dissertation"
                className="pdf-iframe"
              />
            </div>

            <div className="pdf-preview-mobile">
              <p>Inline PDF preview is not supported on mobile devices. Please use the button above to download or open the dissertation in a new tab.</p>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="project-section">
          <h2 className="section-title">Tech Stack</h2>
          <div className="tech-stack">
            <div className="tech-item">
              <span className="tech-label">Engine</span>
              <span className="tech-value">Unity</span>
            </div>
            <div className="tech-item">
              <span className="tech-label">Language</span>
              <span className="tech-value">C#</span>
            </div>
            <div className="tech-item">
              <span className="tech-label">Architecture</span>
              <span className="tech-value">FSM + CBR Hybrid</span>
            </div>
            <div className="tech-item">
              <span className="tech-label">AI Model</span>
              <span className="tech-value">Case-Based Reasoning</span>
            </div>
            <div className="tech-item">
              <span className="tech-label">Sensor Model</span>
              <span className="tech-value">Inverse Square Law Physics</span>
            </div>
            <div className="tech-item">
              <span className="tech-label">Telemetry</span>
              <span className="tech-value">Event-Driven System</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default EWSProject;
