/**
 * Módulo de funções reutilizáveis entre background, content e popup.
 */

const SCIUtils = {
  /**
   * Formata uma data no padrão brasileiro (DD/MM/YYYY).
   */
  formatDateBR(date = new Date()) {
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  },

  /**
   * Processa variáveis dinâmicas em templates de snippet.
   * Suporta: {{current_date}}, {{user_name}}, {{user_role}}
   */
  parseTemplate(template, userInfo = {}) {
    const now = new Date();
    return template
      .replace(/\{\{current_date\}\}/g, this.formatDateBR(now))
      .replace(/\{\{user_name\}\}/g, userInfo.name || 'Colaborador')
      .replace(/\{\{user_role\}\}/g, userInfo.role || 'Equipe SCI');
  },

  /**
   * Debounce para limitar frequência de execução.
   */
  debounce(fn, ms) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  },

  /**
   * Logger centralizado com níveis.
   */
  log(level, message, data) {
    const prefix = '[SCI Snippets]';
    const method = ['error', 'warn'].includes(level) ? level : 'log';
    const entry = { timestamp: new Date().toISOString(), level, message, data };
    if (data) {
      console[method](prefix, message, data);
    } else {
      console[method](prefix, message);
    }
    return entry;
  },

  /**
   * Verifica se um elemento é um campo de texto editável.
   */
  isEditableElement(element) {
    if (!element) return false;
    const tag = element.tagName;
    const editable = element.isContentEditable;
    const isInput = tag === 'INPUT' || tag === 'TEXTAREA';
    const isRichEditor = editable || element.getAttribute('role') === 'textbox';
    return isInput || isRichEditor;
  },

  /**
   * Sanitiza texto para inserção segura.
   */
  sanitizeText(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
};

// Exporta para uso em módulos ou scripts tradicionais
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SCIUtils;
}