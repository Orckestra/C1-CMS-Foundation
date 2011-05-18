using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web.Hosting;
using System.Xml.Linq;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Routing.Plugins.UrlFormatters;
using Composite.Core.Routing.Plugins.UrlFormatters.Runtime;
using Composite.Core.Types;
using Composite.Core.Xml;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;

namespace Composite.Plugins.Routing.UrlFormatters
{
    [ConfigurationElementType(typeof(StringReplaceUrlFormatterData))]
    internal class StringReplaceUrlFormatter : IUrlFormatter
    {
        readonly List<Pair<string, string>> _replacementRules = new List<Pair<string, string>>();

        public StringReplaceUrlFormatter(List<Pair<string, string>> replacementRules)
        {
            _replacementRules = replacementRules;
        }

        public string FormatUrl(string url)
        {
            foreach(var pair in _replacementRules)
            {
                if(pair.First.Length == 1 && pair.Second.Length == 1)
                {
                    url = url.Replace(pair.First[0], pair.Second[0]);
                }
                else
                {
                    url = url.Replace(pair.First, pair.Second);
                }
            }
            return url;
        }
    }

    [Assembler(typeof(StringReplaceUrlFormatterAssembler))]
    internal sealed class StringReplaceUrlFormatterData : UrlFormatterData
    {
        private const string RulesFilePropertyName = "rulesFile";

        /// <exclude />
        [ConfigurationProperty(RulesFilePropertyName, IsRequired = false)]
        public string RulesFile
        {
            get
            {
                return (string)this[RulesFilePropertyName];
            }
            set
            {
                this[RulesFilePropertyName] = value;
            }
        }

        private const string ReplaceProperty = "ReplacementRules";
        [ConfigurationProperty(ReplaceProperty)]
        public ReplacementElementCollection Replace
        {
            get
            {
                return (ReplacementElementCollection)base[ReplaceProperty];
            }
        }
    }

    internal sealed class ReplacementElementCollection : ConfigurationElementCollection
    {
        public void Add(ReplacementRuleConfigurationElement element)
        {
            BaseAdd(element);
        }

        protected override ConfigurationElement CreateNewElement()
        {
            return new ReplacementRuleConfigurationElement();
        }

        protected override object GetElementKey(ConfigurationElement element)
        {
            return ((ReplacementRuleConfigurationElement)element).OldValue;
        }
    }

    internal sealed class StringReplaceUrlFormatterAssembler : IAssembler<IUrlFormatter, UrlFormatterData>
    {
        public IUrlFormatter Assemble(IBuilderContext context, UrlFormatterData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            var data = (StringReplaceUrlFormatterData)objectConfiguration;

            string rulesFile = data.RulesFile;
            if (!rulesFile.IsNullOrEmpty())
            {
                string fullPath = HostingEnvironment.MapPath(rulesFile);
                Verify.That(C1File.Exists(fullPath), "Cannot find file '{0}'", rulesFile);

                try
                {
                    XDocument xDoc = XDocumentUtils.Load(fullPath);

                    return new StringReplaceUrlFormatter(
                        xDoc.Root.Elements()
                        .Select(e => new Pair<string, string>(GetAttributeNotNull(e, "oldValue"), GetAttributeNotNull(e, "newValue"))).ToList());
                }
                catch (Exception e)
                {
                    throw new ConfigurationErrorsException("Failed to process file '{0}'".FormatWith(rulesFile), e);
                }
            }

            var replacements = data.Replace.Cast<ReplacementRuleConfigurationElement>();

            return new StringReplaceUrlFormatter(replacements.Select(r => new Pair<string, string>(r.OldValue, r.NewValue)).ToList());
        }

        private static string GetAttributeNotNull(XElement xelement, string attributeName)
        {
            var attr = xelement.Attribute(attributeName);
            Verify.IsNotNull(attr, "Missing '{0}' attribute", attributeName);

            return attr.Value;
        }
    }
    internal sealed class ReplacementRuleConfigurationElement : ConfigurationElement
    {
        private const string _oldValueAttributeName = "oldValue";
        [ConfigurationProperty(_oldValueAttributeName)]
        public string OldValue
        {
            get { return (string)base[_oldValueAttributeName]; }
            set { base[_oldValueAttributeName] = value; }
        }

        private const string _newValueAttributeName = "newValue";
        [ConfigurationProperty(_newValueAttributeName)]
        public string NewValue
        {
            get { return (string)base[_newValueAttributeName]; }
            set { base[_newValueAttributeName] = value; }
        }
    }
}
