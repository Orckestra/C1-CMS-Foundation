using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;
using System.Workflow.ComponentModel;
using System.Workflow.ComponentModel.Serialization;
using System.Workflow.Runtime.Hosting;
using Composite.Core;
using Composite.Core.IO;
using Composite.Core.Logging;
using Composite.Core.Types;


namespace Composite.C1Console.Workflow
{
    internal class FileWorkflowPersistenceService : WorkflowPersistenceService
    {
        private static readonly string LogTitle = "Workflow File Persisting Service";
        private readonly string _baseDirectory;
        private Guid[] _abortedWorkflows;
        private readonly object _syncRoot = new object();

        private C1FileSystemWatcher _fileWatcher;

        private readonly ConcurrentDictionary<Guid, byte> _createdWorkflows = new ConcurrentDictionary<Guid, byte>();

        public FileWorkflowPersistenceService(string baseDirectory)
        {
            _baseDirectory = baseDirectory;
            this.PersistAll = false;
        }

        public bool PersistAll { get; set; }

        public IEnumerable<Guid> GetAbortedWorkflows()
        {
            return _abortedWorkflows ?? new Guid[0];
        }

        public IEnumerable<Guid> GetPersistedWorkflows()
        {
            foreach (string filePath in C1Directory.GetFiles(_baseDirectory, "*.bin"))
            {
                Guid workflowId;
                if (TryParseWorkflowId(filePath, out workflowId))
                {
                    yield return workflowId;
                }
            }
        }

        private bool TryParseWorkflowId(string filePath, out Guid workflowId)
        {
            string guidString = Path.GetFileNameWithoutExtension(filePath);
            return Guid.TryParse(guidString ?? "", out workflowId);
        }

        public void ListenToDynamicallyAddedWorkflows(Action<Guid> onWorkflowFileAdded)
        {
            Verify.IsNull(_fileWatcher, "The method has already been invoked");

            Action<string> handleWorkflowAdded = name =>
            {
                try
                {
                    Guid workflowId;
                    if (TryParseWorkflowId(name, out workflowId) 
                        && !_createdWorkflows.ContainsKey(workflowId))
                    {
                        onWorkflowFileAdded(workflowId);
                    }
                }
                catch (Exception ex)
                {
                    Log.LogError(LogTitle, ex);
                }
            };

            var fileWatcher = new C1FileSystemWatcher(_baseDirectory, "*.bin")
            {
                IncludeSubdirectories = false
            };

            fileWatcher.Created += (sender, args) => handleWorkflowAdded(args.Name);
            fileWatcher.Renamed += (sender, args) => handleWorkflowAdded(args.Name);

            fileWatcher.EnableRaisingEvents = true;
            _fileWatcher = fileWatcher;
        }


        public bool RemovePersistedWorkflow(Guid instanceId)
        {
            string filename = GetFileName(instanceId);

            if (C1File.Exists(filename))
            {
                try
                {
                    C1File.Delete(filename);

                    Log.LogVerbose(LogTitle, $"Workflow persisted state deleted. Id = {instanceId}");
                }
                catch
                {
                    return false;
                }
            }

            byte _;
            _createdWorkflows.TryRemove(instanceId, out _);

            return true;
        }



        protected override Activity LoadCompletedContextActivity(Guid scopeId, Activity outerActivity)
        {
            object obj = DeserializeActivity(outerActivity, scopeId);
            return (Activity)obj;
        }



        protected override Activity LoadWorkflowInstanceState(Guid instanceId)
        {
            string filename = GetFileName(instanceId);
            bool deleteFile = false;

            if (C1File.Exists(filename))
            {
                try
                {
                    object obj = DeserializeActivity(null, instanceId);
                    return (Activity)obj;
                }
                catch (Exception ex)
                {
                    LoggingService.LogCritical(LogTitle, ex);
                    deleteFile = true;
                }
            }

            if (deleteFile)
            {
                Log.LogWarning(LogTitle, $"Failed to load workflow with id '{filename}'. Deleting file.");
                C1File.Delete(filename);

                MarkWorkflowAsAborted(instanceId);
            }

            return null;
        }



        protected override void SaveCompletedContextActivity(Activity activity)
        {
            SaveWorkflowInstanceState(activity);
        }



        protected override void SaveWorkflowInstanceState(Activity rootActivity, bool unlock)
        {
            SaveWorkflowInstanceState(rootActivity);
        }


        protected override bool UnloadOnIdle(Activity activity)
        {
            var persistingType = GetPersistingType(activity);

            if (persistingType == WorkflowPersistingType.Shutdown)
            {
                SaveWorkflowInstanceState(activity);
            }

            return persistingType == WorkflowPersistingType.Idle;
        }


        private void SaveWorkflowInstanceState(Activity activity)
        {
            Guid workflowId = (Guid)activity.GetValue(Activity.ActivityContextGuidProperty);
            SerializeActivity(activity, workflowId);
        }


        protected override void UnlockWorkflowInstanceState(Activity rootActivity)
        {
            //empty
        }

        private bool ActivityIsSerializable(Activity activity)
        {
            return PersistAll || GetPersistingType(activity) != WorkflowPersistingType.Never;
        }

        private WorkflowPersistingType GetPersistingType(Activity activity)
        {
            List<AllowPersistingWorkflowAttribute> attributes = activity.GetType().GetCustomAttributesRecursively<AllowPersistingWorkflowAttribute>().ToList();

            if (attributes.Count == 0) return WorkflowPersistingType.Never;

            return attributes[0].WorkflowPersistingType;
        }

        private void SerializeActivity(Activity rootActivity, Guid id)
        {
            if (!ActivityIsSerializable(rootActivity))
            {
                Log.LogVerbose(LogTitle,
                    $"The workflow does not support persiting. Id = {id}, Type = {rootActivity.GetType()}");
                return;
            }

            string filename = GetFileName(id);

            IFormatter formatter = new BinaryFormatter();
            formatter.SurrogateSelector = ActivitySurrogateSelector.Default;

            _createdWorkflows[id] = 0;

            using (var stream = new C1FileStream(filename, FileMode.OpenOrCreate))
            {
                try
                {
                    rootActivity.Save(stream, formatter);
                    stream.Close();
                }
                catch (SerializationException ex)
                {
                    Log.LogError(LogTitle, ex);
                }
            }

            // Log.LogVerbose(LogTitle, $"Workflow persisted. Id = {id}, Type = {rootActivity.GetType()}");
        }



        private object DeserializeActivity(Activity rootActivity, Guid id)
        {
            string filename = GetFileName(id);
            object result;

            var formatter = new BinaryFormatter
            {
                SurrogateSelector = ActivitySurrogateSelector.Default
            };

            using (var stream = new C1FileStream(filename, FileMode.Open))
            {
                result = Activity.Load(stream, rootActivity, formatter);
            }

            // Log.LogVerbose(LogTitle, $"Workflow loaded. Id = {id}, Type = {result.GetType()}");

            return result;
        }

        private void MarkWorkflowAsAborted(Guid id)
        {
            lock (_syncRoot)
            {
                _abortedWorkflows = (_abortedWorkflows ?? Array.Empty<Guid>())
                                    .Concat(new [] {id}).ToArray();
            }
        }

        private string GetFileName(Guid id)
        {
            return Path.Combine(this._baseDirectory, $"{id}.bin");
        }
    }
}
