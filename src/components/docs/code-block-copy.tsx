'use client';

import { useEffect } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { Check, Copy } from 'lucide-react';

export function CodeBlockCopy() {
  useEffect(() => {
    // add copy buttons to code blocks
    const codeBlocks = document.querySelectorAll('.docs-prose pre');

    codeBlocks.forEach((block) => {
      // skip if button already exists
      if (block.querySelector('.copy-code-button')) return;

      const wrapper = document.createElement('div');
      wrapper.className = 'relative group';
      block.parentNode?.insertBefore(wrapper, block);
      wrapper.appendChild(block);

      const button = document.createElement('button');
      button.className =
        'copy-code-button group/btn absolute right-2 top-2 rounded-lg border border-border bg-background p-2 opacity-0 transition-all hover:bg-muted group-hover:opacity-100';
      button.innerHTML = `
        <span class="copy-icon">${renderToStaticMarkup(<Copy className="h-4 w-4" />)}</span>
        <span class="check-icon hidden">${renderToStaticMarkup(<Check className="h-4 w-4" />)}</span>
      `;

      const tooltip = document.createElement('span');
      tooltip.className =
        'pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-popover px-2.5 py-1.5 text-xs text-popover-foreground shadow-sm opacity-0 transition-opacity duration-150 group-hover/btn:opacity-100';
      tooltip.textContent = 'Copy to clipboard';
      button.appendChild(tooltip);

      button.addEventListener('click', async () => {
        const code = block.querySelector('code');
        if (!code) return;

        try {
          await navigator.clipboard.writeText(code.textContent || '');

          const copyIcon = button.querySelector('.copy-icon');
          const checkIcon = button.querySelector('.check-icon');

          copyIcon?.classList.add('hidden');
          checkIcon?.classList.remove('hidden');
          tooltip.textContent = 'Copied!';

          setTimeout(() => {
            copyIcon?.classList.remove('hidden');
            checkIcon?.classList.add('hidden');
            tooltip.textContent = 'Copy to clipboard';
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
