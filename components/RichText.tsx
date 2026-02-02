'use client';

import React from 'react';

// Types for Lexical content
interface LexicalTextNode {
  type: 'text';
  text: string;
  format?: number;
  style?: string;
}

interface LexicalLinkNode {
  type: 'link';
  children: LexicalNode[];
  fields?: {
    url?: string;
    newTab?: boolean;
  };
}

interface LexicalListItemNode {
  type: 'listitem';
  children: LexicalNode[];
  value?: number;
}

interface LexicalListNode {
  type: 'list';
  listType: 'bullet' | 'number';
  children: LexicalListItemNode[];
}

interface LexicalParagraphNode {
  type: 'paragraph';
  children: LexicalNode[];
}

interface LexicalHeadingNode {
  type: 'heading';
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: LexicalNode[];
}

interface LexicalLineBreakNode {
  type: 'linebreak';
}

type LexicalNode =
  | LexicalTextNode
  | LexicalLinkNode
  | LexicalListItemNode
  | LexicalListNode
  | LexicalParagraphNode
  | LexicalHeadingNode
  | LexicalLineBreakNode
  | { type: string; children?: LexicalNode[]; [key: string]: unknown };

// Accept unknown[] so API-fetched JSON (typed as unknown[]) is assignable
interface LexicalContent {
  root: {
    children: LexicalNode[] | unknown[];
  };
}

// Text format flags (bit flags)
const IS_BOLD = 1;
const IS_ITALIC = 2;
const IS_STRIKETHROUGH = 4;
const IS_UNDERLINE = 8;
const IS_CODE = 16;

function renderTextWithFormat(text: string, format?: number): React.ReactNode {
  if (!format) return text;

  let result: React.ReactNode = text;

  if (format & IS_CODE) {
    result = <code className="rounded bg-gray-100 px-1 font-mono">{result}</code>;
  }
  if (format & IS_STRIKETHROUGH) {
    result = <s>{result}</s>;
  }
  if (format & IS_UNDERLINE) {
    result = <u>{result}</u>;
  }
  if (format & IS_ITALIC) {
    result = <em>{result}</em>;
  }
  if (format & IS_BOLD) {
    result = <strong className="font-bold">{result}</strong>;
  }

  return result;
}

function renderNode(node: LexicalNode | unknown, index: number): React.ReactNode {
  const n = node as LexicalNode;
  switch (n.type) {
    case 'text': {
      const textNode = n as LexicalTextNode;
      return (
        <React.Fragment key={index}>
          {renderTextWithFormat(textNode.text, textNode.format)}
        </React.Fragment>
      );
    }

    case 'linebreak':
      return <br key={index} />;

    case 'link': {
      const linkNode = n as LexicalLinkNode;
      const url = linkNode.fields?.url || '#';
      const newTab = linkNode.fields?.newTab;
      return (
        <a
          key={index}
          href={url}
          target={newTab ? '_blank' : undefined}
          rel={newTab ? 'noopener noreferrer' : undefined}
          className="text-blue-600 hover:underline"
        >
          {linkNode.children?.map((child, i) => renderNode(child, i))}
        </a>
      );
    }

    case 'paragraph': {
      const paragraphNode = n as LexicalParagraphNode;
      return (
        <p
          key={index}
          className="text-base font-light leading-relaxed text-black mb-4 last:mb-0"
        >
          {paragraphNode.children?.map((child, i) => renderNode(child, i))}
        </p>
      );
    }

    case 'heading': {
      const headingNode = n as LexicalHeadingNode;
      const Tag = headingNode.tag;
      return (
        <Tag key={index} className="font-bold text-black mb-2">
          {headingNode.children?.map((child, i) => renderNode(child, i))}
        </Tag>
      );
    }

    case 'list': {
      const listNode = n as LexicalListNode;
      const ListTag = listNode.listType === 'bullet' ? 'ul' : 'ol';
      return (
        <ListTag
          key={index}
          className={`list-outside space-y-3 pl-5 text-base font-light leading-relaxed text-black mb-4 ${
            listNode.listType === 'bullet' ? 'list-disc' : 'list-decimal'
          }`}
        >
          {listNode.children?.map((child, i) => renderNode(child, i))}
        </ListTag>
      );
    }

    case 'listitem': {
      const listItemNode = n as LexicalListItemNode;
      return (
        <li
          key={index}
          className="text-base font-light leading-relaxed text-black [&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:font-mono [&_em]:italic [&_s]:line-through [&_strong]:font-bold [&_u]:underline"
        >
          {listItemNode.children?.map((child, i) => renderNode(child, i))}
        </li>
      );
    }

    default: {
      // Handle unknown nodes with children (not all LexicalNode variants have children)
      const nodeWithChildren = n as { children?: LexicalNode[] };
      if (nodeWithChildren.children && Array.isArray(nodeWithChildren.children)) {
        return (
          <React.Fragment key={index}>
            {nodeWithChildren.children.map((child, i) => renderNode(child, i))}
          </React.Fragment>
        );
      }
      return null;
    }
  }
}

interface RichTextProps {
  content: LexicalContent | string | null | undefined;
  className?: string;
}

export default function RichText({ content, className = '' }: RichTextProps) {
  if (!content) return null;

  // Handle string content (plain text fallback)
  if (typeof content === 'string') {
    return (
      <div className={className}>
        <p className="text-base font-light leading-relaxed text-black">{content}</p>
      </div>
    );
  }

  // Handle Lexical content
  if (content.root && content.root.children) {
    return (
      <div className={className}>
        {content.root.children.map((node, index) => renderNode(node, index))}
      </div>
    );
  }

  return null;
}
