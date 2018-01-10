using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Globalization;
using System.Threading;

namespace Composite.Core.Threading
{
    /// <summary>
    /// Will set the threads Culture and reset it to the original value when this is disposed of.
    /// <example>
    /// using( var cultureScope = new ThreadCultureScope( new CultureInfo("da-DK") ) )
    /// {
    ///   // Code here will run in da-DK scope. 
    ///   // Culture in effect before the using statement will be reset when exiting the using.
    /// }
    /// </example>
    /// </summary>
    public sealed class ThreadCultureScope : IDisposable
    {
        private CultureInfo _originalCulture = null;
        private CultureInfo _originalUiCulture = null;
        private CultureInfo _desiredCulture = null;
        private CultureInfo _desiredUiCulture = null;
        private bool _disposed = false;

        /// <summary>
        /// Constructs a new culture scope, setting the threads CurrentCulture and resetting when this is disposed. The CurrentUiCulture is not affected.
        /// </summary>
        /// <param name="culture">Desired culture to be in effect</param>
        public ThreadCultureScope(CultureInfo culture)
        {
            _originalCulture = Thread.CurrentThread.CurrentCulture;
            _desiredCulture = culture;

            Thread.CurrentThread.CurrentCulture = culture;
        }


        /// <summary>
        /// Constructs a new culture scope, setting the threads CurrentCulture and CurrentUiCulture and resetting when this is disposed.
        /// </summary>
        /// <param name="culture">Desired culture to be in effect</param>
        /// <param name="uiCulture">Desired UI culture to be in effect</param>
        public ThreadCultureScope(CultureInfo culture, CultureInfo uiCulture)
            : this(culture)
        {
            _originalUiCulture = Thread.CurrentThread.CurrentUICulture;
            _desiredUiCulture = uiCulture;

            Thread.CurrentThread.CurrentUICulture = uiCulture;
        }


        /// <summary>
        /// The culture this class was constructed to use
        /// </summary>
        public CultureInfo Culture
        {
            get { return _desiredCulture; }
        }


        /// <summary>
        /// The UI culture this class was constructed to use or null if none were specified.
        /// </summary>
        public CultureInfo UiCulture
        {
            get { return _desiredUiCulture; }
        }

        
        /// <summary>
        /// Return thread culture settings to their original values.
        /// </summary>
        public void Dispose()
        {
            if (!_disposed)
            {
                if (_originalCulture!=null)
                    Thread.CurrentThread.CurrentCulture = _originalCulture;

                if (_originalUiCulture != null)
                    Thread.CurrentThread.CurrentUICulture = _originalUiCulture;

                _disposed = true;                
            }

#if LeakCheck
            GC.SuppressFinalize(this);
#endif
        }

#if LeakCheck
        private string stack = Environment.StackTrace;
        /// <exclude />
        ~ThreadCultureScope()
        {
            Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
        }
#endif
    }
}
