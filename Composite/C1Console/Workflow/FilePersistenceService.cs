using System;
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
                string guidString = Path.GetFileNameWithoutExtension(filePath);

                Guid guid = Guid.Empty;
                try
                {
                    guid = new Guid(guidString);
                }
                catch { }

                if (guid != Guid.Empty)
                {
                    yield return guid;
                }
            }
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
            Guid contextGuid = (Guid)activity.GetValue(Activity.ActivityContextGuidProperty);
            SerializeActivity(activity, contextGuid);
        }



        protected override void SaveWorkflowInstanceState(Activity rootActivity, bool unlock)
        {
            Guid contextGuid = (Guid)rootActivity.GetValue(Activity.ActivityContextGuidProperty);
            SerializeActivity(rootActivity, contextGuid);
        }


        protected override bool UnloadOnIdle(Activity activity)
        {
            return GetPersistingType(activity) == WorkflowPersistingType.Idle;
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

            IFormatter formatter = new BinaryFormatter();
            formatter.SurrogateSelector = ActivitySurrogateSelector.Default;

            using (C1FileStream stream = new C1FileStream(filename, FileMode.Open))
            {
                result = Activity.Load(stream, rootActivity, formatter);
                stream.Close();
            }

            // Log.LogVerbose(LogTitle, $"Workflow loaded. Id = {id}, Type = {result.GetType()}");

            return result;
        }

        private void MarkWorkflowAsAborted(Guid id)
        {
            lock (_syncRoot)
            {
                List<Guid> newList = new List<Guid>(_abortedWorkflows ?? new Guid[0]);
                newList.Add(id);

                _abortedWorkflows = newList.ToArray();
            }
        }

        private string GetFileName(Guid id)
        {
            return Path.Combine(this._baseDirectory, id.ToString() + ".bin");
        }
    }
}
