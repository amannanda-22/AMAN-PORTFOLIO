// ============================================================
// AMAN NANDA PORTFOLIO — main.js
// Orchestrates all modules after preloader completes
// ============================================================

import { initPreloader } from './preloader.js';
import { initCursor }    from './cursor.js';
import { initNav }       from './nav.js';
import { initAnimations } from './animations.js';
import { initContact }   from './contact.js';

// ─── CONFIG (edit everything from here) ──────────────────────
export const CONFIG = {
  name: 'Aman Nanda',
  initials: 'AN',
  role: 'Generative AI Engineer',
  tagline: 'Building intelligent systems that understand, reason, and act — from RAG pipelines to multi-agent workflows and quantum algorithms.',
  email: 'nandaamannaidu@gmail.com',
  phone: '+91-9392994892',
  linkedin: 'https://linkedin.com/in/nanda-aman-naidu',
  github: 'https://github.com/amannaidu',
  location: 'Kakinada, Andhra Pradesh, India',
  timezone: 'IST (UTC+5:30)',
  cgpa: '9.0',
  openToWork: true,
  resumeUrl: '/resume.pdf',

  projects: [
    {
      id: 'agentx',
      num: '01',
      title: 'AgentX',
      subtitle: 'Autonomous AI Research System',
      year: '2024',
      desc: 'Production-grade multi-agent system with a 5-agent pipeline for autonomous research: Planner, Researcher, Critic, Synthesizer, and Publisher. Powered by Gemini Flash + LangGraph with sub-10-minute research cycles.',
      highlights: ['5-agent pipeline', 'Gemini Flash', 'LangGraph', '93% accuracy'],
      tags: ['Python', 'LangGraph', 'Gemini', 'FastAPI', 'React'],
      github: 'https://github.com/amannaidu/agentx',
      live: '',
    },
    {
      id: 'documind',
      num: '02',
      title: 'DocuMind AI',
      subtitle: 'Intelligent Document Q&A',
      year: '2024',
      desc: 'Context-aware document intelligence with adaptive chunking, hybrid vector search, and multi-turn memory. Processes PDFs, Word docs, and spreadsheets with 94% accuracy on enterprise datasets.',
      highlights: ['Hybrid RAG', 'Multi-turn memory', 'FAISS + BM25', '94% accuracy'],
      tags: ['Python', 'LangChain', 'FAISS', 'OpenAI', 'Streamlit'],
      github: 'https://github.com/amannaidu/documind',
      live: '',
    },
    {
      id: 'evalmind',
      num: '03',
      title: 'EvalMind',
      subtitle: 'LLM Evaluation Dashboard',
      year: '2024',
      desc: 'Comprehensive evaluation framework for LLMs with custom metrics including factuality scoring, hallucination detection, and response quality grading across 12 benchmark datasets.',
      highlights: ['12 benchmarks', 'Hallucination detection', 'Custom metrics', 'Real-time viz'],
      tags: ['Python', 'PyTorch', 'Weights&Biases', 'HuggingFace', 'Plotly'],
      github: 'https://github.com/amannaidu/evalmind',
      live: '',
    },
    {
      id: 'quantum',
      num: '04',
      title: 'Quantum Job Tracker',
      subtitle: 'Quantum ML Application',
      year: '2025',
      desc: 'Hybrid quantum-classical ML system for job market analytics using Qiskit variational circuits. Implements QAOA for optimization with 1,500+ job records processed via quantum feature maps.',
      highlights: ['Qiskit VQC', 'QAOA optimization', '1500+ records', 'Hybrid classical-quantum'],
      tags: ['Python', 'Qiskit', 'PennyLane', 'scikit-learn', 'Plotly'],
      github: 'https://github.com/amannaidu/quantum-job-tracker',
      live: '',
    },
  ],
};

// ─── Boot ─────────────────────────────────────────────────────────────────────
function boot() {
  initCursor();
  initNav();
  initContact();

  initPreloader(() => {
    // After preloader exits, run main animations
    initAnimations();
  });
}

// Wait for DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
