using System;
using System.CodeDom.Compiler;
using System.Collections;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Web;
//using System.Web.Instrumentation;
using System.Web.WebPages.Scope;
using Microsoft.CSharp;

namespace Composite.AspNet.Razor
{
    internal class NoHttpRazorContext : HttpContextBase
    {
        private static readonly bool IsDontNet4_5OrOlder;
        private static readonly ConstructorInfo VersionSpecificConstructor;

		private readonly IDictionary _items = new Hashtable();
		public override IDictionary Items
		{
			get { return _items; }
		}

		private readonly HttpRequestBase _request = new NoHttpRazorRequest();
		public override HttpRequestBase Request
		{
			get { return _request; }
		}

        public override HttpServerUtilityBase Server
        {
            get { throw new NotSupportedException("Usage of 'Server' isn't supported without HttpContext. Use System.Web.HttpUtility for [html|url] [encoding|decoding]"); }
        }

/*      
        // Should be uncommented when we do switch to .NET 4.5
  
        private readonly PageInstrumentationService _pageInstrumentation = new PageInstrumentationService();
        public virtual PageInstrumentationService PageInstrumentation
        {
            get { return _pageInstrumentation; }
        }
 
        private readonly HttpServerUtilityBase _server = new HttpServerUtilityWrapper(new HttpServerUtility(null as HttpContext));
        public override HttpServerUtilityBase Server
        {
            get { return _server; }
        } 
 */
 
		private NoHttpRazorContext()
		{
			ScopeStorage.CurrentProvider = new StaticScopeStorageProvider();
		}

        /// <summary>
        /// Get implementation compatible with current .NET version (4.0 or 4.5)
        /// </summary>
        /// <returns></returns>
        internal static HttpContextBase GetDotNetSpecificVersion()
        {
            if (IsDontNet4_5OrOlder)
            {
                return (HttpContextBase) VersionSpecificConstructor.Invoke(null);
            }

            return new NoHttpRazorContext();
        }

        static NoHttpRazorContext()
        {
            IsDontNet4_5OrOlder = typeof (HttpContextBase).GetProperty("PageInstrumentation") != null;
            if (!IsDontNet4_5OrOlder)
            {
                return;
            }

            string code = @"
using System;
using System.Collections;
using System.Web;
using System.Web.Instrumentation;
using System.Web.WebPages.Scope;

namespace Composite.AspNet.Razor
{
    internal class NoHttpRazorContext : HttpContextBase
    {
		private readonly IDictionary _items = new Hashtable();
		public override IDictionary Items
		{
			get { return _items; }
		}

		private readonly HttpRequestBase _request = new NoHttpRazorRequest();
		public override HttpRequestBase Request
		{
			get { return _request; }
		}

        private readonly PageInstrumentationService _pageInstrumentation = new PageInstrumentationService();
        public override PageInstrumentationService PageInstrumentation
        {
            get { return _pageInstrumentation; }
        }

        public override HttpServerUtilityBase Server
        {
            get { throw new NotSupportedException(""Usage of 'Server' isn't supported without HttpContext. Use System.Web.HttpUtility for [html|url] [encoding|decoding]""); }
        }

		public NoHttpRazorContext()
		{
			ScopeStorage.CurrentProvider = new StaticScopeStorageProvider();
		}
    }

    internal class NoHttpRazorRequest : HttpRequestBase
	{
		public override bool IsLocal
		{
			get { return false; }
		}
	}
}";
            Type type = BuildAssembly(code).GetType("Composite.AspNet.Razor.NoHttpRazorContext", true);

            VersionSpecificConstructor = type.GetConstructors().Single();
        }

        private static Assembly BuildAssembly(string code)
        {
            var provider = new CSharpCodeProvider();
            ICodeCompiler compiler = provider.CreateCompiler();
            var compilerparams = new CompilerParameters();
            compilerparams.GenerateExecutable = false;
            compilerparams.GenerateInMemory = true;

            compilerparams.ReferencedAssemblies.Add(typeof (HttpContext).Assembly.Location);
            compilerparams.ReferencedAssemblies.Add(typeof (ScopeStorage).Assembly.Location);

            CompilerResults results = compiler.CompileAssemblyFromSource(compilerparams, code);
            if (results.Errors.HasErrors)
            {
                var errors = new StringBuilder("Compiler Errors :\r\n");
                foreach (CompilerError error in results.Errors)
                {
                    errors.AppendFormat("Line {0},{1}\t: {2}\n", error.Line, error.Column, error.ErrorText);
                }
                throw new Exception(errors.ToString());
            }
            
            return results.CompiledAssembly;
        }
    }
}