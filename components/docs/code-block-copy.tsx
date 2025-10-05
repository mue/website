'use client';

import { Check, Copy } from 'lucide-react';
import { useEffect } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

export function CodeBlockCopy() {
  useEffect(() => {
    // Add copy buttons to code blocks
    const codeBlocks = document.querySelectorAll('.docs-prose pre');

    codeBlocks.forEach((block) => {
      // Skip if button already exists
      if (block.querySelector('.copy-code-button')) return;

      const wrapper = document.createElement('div');
      wrapper.className = 'relative group';
      block.parentNode?.insertBefore(wrapper, block);
      wrapper.appendChild(block);

      const button = document.createElement('button');
      button.className =
        'copy-code-button absolute right-2 top-2 rounded-lg border border-border bg-background p-2 opacity-0 transition-all hover:bg-muted group-hover:opacity-100';
      button.innerHTML = `
        <span class="copy-icon">${renderToStaticMarkup(<Copy className="h-4 w-4" />)}</span>
        <span class="check-icon hidden">${renderToStaticMarkup(<Check className="h-4 w-4" />)}</span>
      `;
      button.setAttribute('title', 'Copy to clipboard');

      button.addEventListener('click', async () => {
        const code = block.querySelector('code');
        if (!code) return;

        try {
          await navigator.clipboard.writeText(code.textContent || '');

          const copyIcon = button.querySelector('.copy-icon');
          const checkIcon = button.querySelector('.check-icon');

          copyIcon?.classList.add('hidden');
          checkIcon?.classList.remove('hidden');

          setTimeout(() => {
            copyIcon?.classList.remove('hidden');
            checkIcon?.classList.add('hidden');
          }, 2000);
        } catch (err) {
          console.error('Failed to copy code:', err);
        }
      });

      wrapper.appendChild(button);
    });

    // Add copy buttons to inline code that contains URLs or endpoints
    const inlineCodes = document.querySelectorAll('.docs-prose p > code, .docs-prose li > code');

    inlineCodes.forEach((code) => {
      const text = code.textContent || '';

      // Check if it's a URL or endpoint-like string
      const isUrl = /^https?:\/\//.test(text);
      const isEndpoint = /^\/[a-z0-9\/_-]+$/i.test(text) || /^api\.[a-z0-9.]+/i.test(text);

      if (!isUrl && !isEndpoint) return;
      if (code.querySelector('.copy-inline-button')) return;

      const wrapper = document.createElement('span');
      wrapper.className = 'inline-flex items-center gap-1 group/inline';
      code.parentNode?.insertBefore(wrapper, code);
      wrapper.appendChild(code);

      const button = document.createElement('button');
      button.className =
        'copy-inline-button inline-flex items-center justify-center rounded p-0.5 opacity-0 transition-all hover:bg-muted group-hover/inline:opacity-100';
      button.innerHTML = `
        <span class="copy-icon">${renderToStaticMarkup(<Copy className="h-3 w-3" />)}</span>
        <span class="check-icon hidden">${renderToStaticMarkup(<Check className="h-3 w-3" />)}</span>
      `;
      button.setAttribute('title', 'Copy to clipboard');

      button.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
          await navigator.clipboard.writeText(text);

          const copyIcon = button.querySelector('.copy-icon');
          const checkIcon = button.querySelector('.check-icon');

          copyIcon?.classList.add('hidden');
          checkIcon?.classList.remove('hidden');

          setTimeout(() => {
            copyIcon?.classList.remove('hidden');
            checkIcon?.classList.add('hidden');
          }, 2000);
        } catch (err) {
          console.error('Failed to copy code:', err);
        }
      });

      wrapper.appendChild(button);
    });
  }, []);

  return null;
}
