/**
 * Utility Functions Module
 * Provides common functionality across the application
 */
const AppUtils = (() => {
    'use strict';

    // Configuration
    const config = {
        logLevel: 'warn' // 'debug', 'info', 'warn', 'error', 'none'
    };

    // Log levels mapped to console methods
    const logMethods = {
        debug: console.debug,
        info: console.info,
        warn: console.warn,
        error: console.error
    };

    // Current log level numeric value
    const logLevelPriority = {
        none: 5,
        error: 4,
        warn: 3,
        info: 2,
        debug: 1
    };

    /**
     * Log messages with different severity levels
     */
    const logger = {
        setLevel(level) {
            if (logLevelPriority[level] !== undefined) {
                config.logLevel = level;
            } else {
                logger.warn(`Invalid log level: ${level}. Using default: ${config.logLevel}`);
            }
        },
        
        log(level, ...messages) {
            const currentLevel = logLevelPriority[config.logLevel];
            const msgLevel = logLevelPriority[level] || logLevelPriority.info;
            
            if (currentLevel <= msgLevel) {
                const timestamp = new Date().toISOString();
                const logFn = logMethods[level] || console.log;
                logFn(`[% App] [${level.toUpperCase}] ${timestamp}:`, ...messages);
            }
        },
        
        debug(...messages) { this.log('debug', ...messages); },
        info(...messages) { this.log('info', ...messages); },
        warn(...messages) { this.log('warn', ...messages); },
        error(...messages) { this.log('error', ...messages); }
    };

    /**
     * String formatting utilities
     */
    const format = {
        toTitleCase(str) {
            if (typeof str !== 'string') return str;
            return str.replace(/\w\S*/g, txt => 
                txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
            );
        },

        escapeHtml(str) {
            if (typeof str !== 'string') return str;
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        },

        unescapeHtml(str) {
            if (typeof str !== 'string') return str;
            const div = document.createElement('div');
            div.innerHTML = str;
            return div.textContent;
        },

        removeAccents(str) {
            if (typeof str !== 'string') return str;
            return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        }
    };

    /**
     * DOM manipulation utilities
     */
    const dom = {
        createElement(tag, className, text) {
            const el = document.createElement(tag);
            if (className) el.className = className;
            if (text) el.textContent = text;
            return el;
        },

        removeChildren(parent) {
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
            return parent;
        },

        toggleClass(element, className, force) {
            if (typeof force === 'boolean') {
                force ? element.classList.add(className) : element.classList.remove(className);
            } else {
                element.classList.toggle(className);
            }
            return element;
        }
    };

    /**
     * Error handling utilities
     */
    const errorHandler = {
        wrap(fn, defaultMessage = 'An error occurred') {
            return function(...args) {
                try {
                    return fn(...args);
                } catch (error) {
                    logger.error('Wrapped function error:', error);
                    // Add any global error handling here
                    return null;
                }
            };
        },

        asyncHandle(asyncFn, defaultMessage = 'An async error occurred') {
            return async function(...args) {
                try {
                    return await asyncFn(...args);
                } catch (error) {
                    logger.error('Wrapped async function error:', error);
                    // Add any global async error handling here
                    return null;
                }
            };
        }
    };

    /**
     * Throttling and debouncing utilities
     */
    const throttle = {
        _throttleState: {}, // Storage for throttle state

        throttle(fn, delay) {
            return function(...args) {
                const context = this;
                const now = Date.now();
                
                if (!this._throttleState[fn]) {
                    this._throttleState[fn] = now;
                    fn.apply(context, args);
                } else if (now - this._throttleState[fn] > delay) {
                    this._throttleState[fn] = now;
                    fn.apply(context, args);
                }
            };
        },

        debounce(fn, delay) {
            return function(...args) {
                const context = this;
                clearTimeout(this._debounceTimer);
                this._debounceTimer = setTimeout(() => {
                    fn.apply(context, args);
                }, delay);
                return this._debounceTimer;
            };
        }
    };

    // Public API
    return {
        logger,
        format,
        dom,
        errorHandler,
        throttle,
        // Add other utility groups as needed
    };
})();

// Make AppUtils a global variable
window.AppUtils = AppUtils;
