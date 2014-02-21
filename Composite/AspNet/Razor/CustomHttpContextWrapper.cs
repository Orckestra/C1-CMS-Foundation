using System;
using System.Collections;
using System.Collections.Generic;
using System.Reflection;
using System.Web;
using System.Web.WebPages;
using System.Web.WebPages.Scope;

namespace Composite.AspNet.Razor
{
    /// <summary>
    /// Replaces HttpContext.Items collection, with a custom one, that allows WebPage-s to have own execution stacks, allowing them to be executed in parallel.
    /// </summary>
    internal class CustomHttpContextWrapper: HttpContextWrapper
    {
        private readonly IDictionary _items;

        public CustomHttpContextWrapper(HttpContext context): base(context)
        {
            _items = new FixedItemsCollection(context.Items);
        }

        public override System.Collections.IDictionary Items
        {
            get
            {
                return _items;
            }
        }


        private class FixedItemsCollection : Hashtable, IEnumerable
        {
            private readonly IDictionary _innerDictionary;

            private static readonly HashSet<object> _privateKeys;
            private readonly IDictionary _privateValues = new Hashtable(); 

            static FixedItemsCollection()
            {
                Func<Type, string, object> getPrivateStaticField = (type, fieldName) =>
                    type.GetField(fieldName, BindingFlags.NonPublic | BindingFlags.Static).GetValue(null);

                object webPageStackKey = getPrivateStaticField(typeof (TemplateStack), "_contextKey");
                object sourceFilesKey = getPrivateStaticField(typeof (WebPageContext), "_sourceFileKey");
                object pageScopeKey = getPrivateStaticField(typeof(AspNetRequestScopeStorageProvider), "_pageScopeKey");
                object requestScopeKey = getPrivateStaticField(typeof(AspNetRequestScopeStorageProvider), "_requestScopeKey");

                _privateKeys = new HashSet<object> { webPageStackKey, sourceFilesKey, pageScopeKey, requestScopeKey }; 
            }

            public FixedItemsCollection(IDictionary innerDictionary)
            {
                if (innerDictionary is Hashtable)
                {
                    innerDictionary = (IDictionary) (innerDictionary as Hashtable).Clone();
                }

                _innerDictionary = innerDictionary;
            }

            override public void Add(object key, object value)
            {
                if (_privateKeys.Contains(key))
                {
                    _privateValues.Add(key, value);
                    return;
                }

                _innerDictionary.Add(key, value);
            }

            override public void Clear()
            {
                throw new NotSupportedException();
            }

            override public bool Contains(object key)
            {
                if (_privateKeys.Contains(key))
                {
                    return _privateValues.Contains(key);
                }

                return _innerDictionary.Contains(key);
            }

            override public IDictionaryEnumerator GetEnumerator()
            {
                return _innerDictionary.GetEnumerator();
            }

            override public bool IsFixedSize
            {
                get { return _innerDictionary.IsFixedSize; }
            }

            override public bool IsReadOnly
            {
                get { return _innerDictionary.IsReadOnly; }
            }

            override public ICollection Keys
            {
                get { return _innerDictionary.Keys; }
            }

            override public void Remove(object key)
            {
                if (_privateKeys.Contains(key))
                {
                    _privateValues.Remove(key);
                    return;
                }

                _innerDictionary.Remove(key);
            }

            override public ICollection Values
            {
                get { return _innerDictionary.Values; }
            }

            override public object this[object key]
            {
                get
                {
                    if (_privateKeys.Contains(key))
                    {
                        return _privateValues[key];
                    }

                    return _innerDictionary[key];
                }
                set
                {
                    if (_privateKeys.Contains(key))
                    {
                        _privateValues[key] = value;
                        return;
                    }

                    _innerDictionary[key] = value;
                }
            }

            override public void CopyTo(Array array, int index)
            {
                _innerDictionary.CopyTo(array, index);
            }

            override public int Count
            {
                get { return _innerDictionary.Count; }
            }

            override public bool IsSynchronized
            {
                get { return _innerDictionary.IsSynchronized; }
            }

            override public object SyncRoot
            {
                get { return _innerDictionary.SyncRoot; }
            }

            IEnumerator IEnumerable.GetEnumerator()
            {
                return _innerDictionary.GetEnumerator();
            }
        }
    }
}
