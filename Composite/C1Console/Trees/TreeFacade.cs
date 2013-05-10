using System;
using System.Collections.Generic;
using System.Xml.Linq;
using Composite.C1Console.Elements.Plugins.ElementAttachingProvider;
using Composite.C1Console.Events;
using Composite.C1Console.Security;
using Composite.Core;
using Composite.Core.Extensions;


namespace Composite.C1Console.Trees
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class TreeFacade
    {
        private static readonly string LogTitle = "TreeFacade";

        private static readonly ITreeFacade _implementation = new TreeFacadeImpl();
        private static readonly object _lock = new object();
        private static bool _initialized;


        static TreeFacade()
        {
            GlobalEventSystemFacade.SubscribeToPostFlushEvent(OnPostFlushEvent);
        }



        /// <exclude />
        private static void EnsureInitialized()
        {
            if (_initialized) return;

            lock (_lock)
            {
                if (_initialized) return;

                using (new LogExecutionTime(LogTitle, "Initializing tree system"))
                {
                    _implementation.Initialize();
                    _initialized = true;
                }
            }
        }

        private class LogExecutionTime : IDisposable
        {
            private readonly string _message;
            private readonly int _startTime;
            private readonly string _logTitle;

            public LogExecutionTime(string logTitle, string message)
            {
                _logTitle = logTitle;
                _message = message;
                _startTime = Environment.TickCount;
                Log.LogVerbose(_logTitle, "Starting: " + _message);
            }

            public void Dispose()
            {
                int executionTime = Environment.TickCount - _startTime;
                Log.LogVerbose(_logTitle, "Finished: " + _message + " ({0} ms)".FormatWith(executionTime));
            }
        }


        /// <summary>
        /// Returns a tree given the id of the tree or null if no tree exist with the given id
        /// </summary>
        /// <param name="treeId"></param>
        /// <returns></returns>
        public static Tree GetTree(string treeId)
        {
            EnsureInitialized();

            return _implementation.GetTree(treeId);
        }



        /// <exclude />
        public static IEnumerable<Tree> AllTrees
        {
            get
            {
                EnsureInitialized();

                return _implementation.AllTrees;
            }
        }



        /// <exclude />
        public static bool HasAttachmentPoints(EntityToken parentEntityToken)
        {
            EnsureInitialized();

            return _implementation.HasAttachmentPoints(parentEntityToken);
        }



        /// <exclude />
        public static bool HasPossibleAttachmentPoints(EntityToken parentEntityToken)
        {
            EnsureInitialized();

            return _implementation.HasPossibleAttachmentPoints(parentEntityToken);
        }



        /// <exclude />
        public static IEnumerable<Tree> GetTreesByEntityToken(EntityToken parentEntityToken)
        {
            EnsureInitialized();

            return _implementation.GetTreesByEntityToken(parentEntityToken);
        }



        /// <summary>
        /// Adds a attachment point that is persisted by the system and is loaded on every restart
        /// </summary>
        /// <param name="treeId"></param>
        /// <param name="interfaceType"></param>
        /// <param name="keyValue"></param>
        /// <param name="position"></param>
        /// <returns></returns>
        public static bool AddPersistedAttachmentPoint(string treeId, Type interfaceType, object keyValue, ElementAttachingProviderPosition position = ElementAttachingProviderPosition.Top)
        {
            EnsureInitialized();

            return _implementation.AddPersistedAttachmentPoint(treeId, interfaceType, keyValue, position);
        }



        /// <exclude />
        public static bool RemovePersistedAttachmentPoint(string treeId, Type interfaceType, object keyValue)
        {
            EnsureInitialized();

            return _implementation.RemovePersistedAttachmentPoint(treeId, interfaceType, keyValue);
        }



        /// <summary>
        /// This will add a attachment point until the system flushes.
        /// This can be used by element provider implementors to attach trees to their exising trees.
        /// </summary>
        /// <param name="treeId"></param>
        /// <param name="entityToken"></param>
        /// <param name="position"></param>
        public static bool AddCustomAttachmentPoint(string treeId, EntityToken entityToken, ElementAttachingProviderPosition position = ElementAttachingProviderPosition.Top)
        {
            EnsureInitialized();

            return _implementation.AddCustomAttachmentPoint(treeId, entityToken, position);
        }


        /// <summary>
        /// Loads a tree from an <see cref="XDocument"/>
        /// </summary>>
        /// <exclude />
        public static Tree LoadTreeFromDom(string treeId, XDocument document)
        {
            EnsureInitialized();

            return _implementation.LoadTreeFromDom(treeId, document);
        }



        private static void OnPostFlushEvent(PostFlushEventArgs args)
        {
            EnsureInitialized();

            _implementation.OnFlush();
        }
    }
}
