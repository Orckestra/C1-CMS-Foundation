using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;
using System.Threading;
using Composite.C1Console.Security;
using Composite.Core;
using Composite.Data;
using Composite.Data.Types;


namespace Composite.C1Console.Actions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)]
    public static class ActionLockingFacade
    {
        private static readonly string LogTitle = typeof(ActionLockingFacade).Name;
        private static Dictionary<EntityToken, LockingInformation> _lockingInformations = null;
        private static readonly object _lock = new object();
        private static readonly IFormatter _ownerIdFormatter = new BinaryFormatter();



        private static void EnsureInitialization()
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                lock (_lock)
                {
                    if (_lockingInformations == null)
                    {
                        DoInitialize();
                    }
                }
            }
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="entityToken"></param>
        /// <param name="ownerId">Should be serializable</param>
        public static void AcquireLock(EntityToken entityToken, object ownerId)
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                EnsureInitialization();

                AddLockingInformation(entityToken, ownerId);
            }
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="entityToken"></param>
        /// <param name="newOwnerId">Should be serializable</param>
        public static void ChangeLockOwner(EntityToken entityToken, object newOwnerId)
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                EnsureInitialization();

                UpdateLockingInformation(entityToken, newOwnerId);
            }
        }





        /// <summary>
        /// 
        /// </summary>
        /// <param name="entityToken"></param>
        /// <param name="ownerId">Should be serializable</param>
        public static void ReleaseLock(EntityToken entityToken, object ownerId)
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                EnsureInitialization();

                RemoveLockingInformation(entityToken, ownerId);
            }
        }





        /// <summary>
        /// 
        /// </summary>
        /// <param name="ownerId">Should be serializable</param>
        public static void ReleaseAllLocks(object ownerId)
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                EnsureInitialization();

                List<EntityToken> entityTokens =
                    (from li in _lockingInformations
                     where object.Equals(li.Value.OwnerId, ownerId)
                     select li.Key).ToList();

                foreach (EntityToken entityToken in entityTokens)
                {
                    RemoveLockingInformation(entityToken, ownerId);
                }
            }
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="entityToken">Entity token to check if it is locked.</param>
        /// <returns>True if the given entityToken is locked</returns>
        public static bool IsLocked(EntityToken entityToken)
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                EnsureInitialization();

                return _lockingInformations.ContainsKey(entityToken);
            }
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="entityToken">Entity token to check if it is locked.</param>
        /// <returns>Returns the name of the user who has locked the given entity token. Null if no one has a lock on it.</returns>
        public static string LockedBy(EntityToken entityToken)
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                EnsureInitialization();

                LockingInformation lockingInformation;
                if (!_lockingInformations.TryGetValue(entityToken, out lockingInformation))
                {
                    return null;
                }
                
                return lockingInformation.Username;
            }
        }



        /// <summary>    
        /// </summary>
        /// <exclude />
        public static IDisposable Locker
        {
            get
            {
                return new LockerToken();
            }
        }



        internal static void ReleaseAll(string username)
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                EnsureInitialization();

                List<Tuple<EntityToken, object>> itemsToRemove =
                    (from info in _lockingInformations
                     where info.Value.Username == username
                     select new Tuple<EntityToken, object>(info.Key, info.Value.OwnerId)).ToList();

                foreach (var item in itemsToRemove)
                {
                    RemoveLockingInformation(item.Item1, item.Item2);
                }
            }
        }



        /// <summary>
        /// This is a "non-safe" release of a lock. For safe use, use ReleaseLock
        /// </summary>
        /// <param name="entityToken"></param>        
        public static void RemoveLock(EntityToken entityToken)
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                EnsureInitialization();

                if (_lockingInformations.ContainsKey(entityToken))
                {
                    RemoveLockingInformation(entityToken, _lockingInformations[entityToken].OwnerId);
                }
            }
        }



        private static void DoInitialize()
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                Log.LogVerbose("RGB(194, 252, 131)ActionLockingFacade", "----------========== Initializing EntityToken Locks ==========----------");
                int startTime = Environment.TickCount;

                if (_lockingInformations == null)
                {
                    _lockingInformations = new Dictionary<EntityToken, LockingInformation>();

                    LoadLockingInformation();
                }

                int endTime = Environment.TickCount;
                Log.LogVerbose("RGB(194, 252, 131)ActionLockingFacade", string.Format("----------========== Done initializing EntityToken Locks ({0} ms ) ==========----------", endTime - startTime));
            }
        }


        private static void LoadLockingInformation()
        {
            List<ILockingInformation> lockingInformations = DataFacade.GetData<ILockingInformation>().ToList();
            List<Guid> lockingInformationsToDelete = new List<Guid>();

            foreach (ILockingInformation lockingInformation in lockingInformations)
            {
                object ownerId = DeserializeOwnerId(lockingInformation.SerializedOwnerId);

                LockingInformation li = new LockingInformation
                {
                    OwnerId = ownerId,
                    Username = lockingInformation.Username
                };

                try 
                {
                    EntityToken entityToken = EntityTokenSerializer.Deserialize(lockingInformation.SerializedEntityToken);

                    _lockingInformations.Add(entityToken, li);
                }
                catch (Exception)
                {
                    // Removing broken locking information (Ex. dead data source ids) /MRJ
                    lockingInformationsToDelete.Add(lockingInformation.Id);
                }
            }

            foreach (Guid id in lockingInformationsToDelete)
            {
                DataFacade.Delete<ILockingInformation>(f => f.Id == id);
            }
        }



        private static void AddLockingInformation(EntityToken entityToken, object ownerId)
        {
            LockingInformation lockingInformation;
            if (_lockingInformations.TryGetValue(entityToken, out lockingInformation))
            {
                if (object.Equals(lockingInformation.OwnerId, ownerId))
                {
                    // NO OP: The owner may acquire a lock multiple times
                    return;
                }

                // This will only happen if an entity token subclass is not rightly implemented
                throw new ActionLockingException("This item is used by another user, try again.");
            }
            
            lockingInformation = new LockingInformation
                {
                    Username = UserValidationFacade.GetUsername(),
                    OwnerId = ownerId
                };

            string serializedOwnerId = SerializeOwnerId(lockingInformation.OwnerId);

            ILockingInformation li = DataFacade.BuildNew<ILockingInformation>();
            li.Id = Guid.NewGuid();
            li.SerializedEntityToken = EntityTokenSerializer.Serialize(entityToken);
            li.SerializedOwnerId = serializedOwnerId;
            li.Username = lockingInformation.Username;

            DataFacade.AddNew<ILockingInformation>(li);
            _lockingInformations.Add(entityToken, lockingInformation);
        }



        private static void UpdateLockingInformation(EntityToken entityToken, object newOwnerId)
        {
            LockingInformation lockingInformation;
            if (!_lockingInformations.TryGetValue(entityToken, out lockingInformation)) throw new InvalidOperationException("LockingInformation record missing");

            string serializedEntityToken = EntityTokenSerializer.Serialize(entityToken);

            ILockingInformation lockingInformationDataItem =
                DataFacade.GetData<ILockingInformation>().
                Single(f => f.SerializedEntityToken == serializedEntityToken);

            lockingInformationDataItem.SerializedOwnerId = SerializeOwnerId(newOwnerId);
            DataFacade.Update(lockingInformationDataItem);

            lockingInformation.OwnerId = newOwnerId;
        }



        private static void RemoveLockingInformation(EntityToken entityToken, object ownerId)
        {
            LockingInformation lockingInformation;
            if (!_lockingInformations.TryGetValue(entityToken, out lockingInformation)) return;

            if (Equals(lockingInformation.OwnerId, ownerId))
            {
                _lockingInformations.Remove(entityToken);
            }

            string serializedOwnerId = SerializeOwnerId(ownerId);
            string serializedEntityToken = EntityTokenSerializer.Serialize(entityToken);

            ILockingInformation lockingInformationDataItem =
                DataFacade.GetData<ILockingInformation>()
                          .SingleOrDefault(f => f.SerializedEntityToken == serializedEntityToken
                                             && f.SerializedOwnerId == serializedOwnerId);

            if (lockingInformationDataItem == null)
            {
                Log.LogWarning(LogTitle, "Failed to find entity token lock. EntityToken: " + serializedEntityToken);
                return;
            }

            DataFacade.Delete(lockingInformationDataItem);
        }



        private static string SerializeOwnerId(object ownerId)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                _ownerIdFormatter.Serialize(ms, ownerId);

                byte[] bytes = ms.ToArray();

                string serializedOwnerId = Convert.ToBase64String(bytes);

                return serializedOwnerId;
            }
        }


        internal static object DeserializeOwnerId(string serializedOwnerId)
        {
            byte[] bytes = Convert.FromBase64String(serializedOwnerId);
            using (MemoryStream ms = new MemoryStream(bytes))
            {
                return _ownerIdFormatter.Deserialize(ms);
            }
        }


        private sealed class LockingInformation
        {
            public string Username { get; set; }
            public object OwnerId { get; set; }
        }



        private static void Lock()
        {
            bool success = false;
            Monitor.TryEnter(_lock, TimeSpan.FromMinutes(1), ref success);

            if (!success)
            {
                throw new InvalidOperationException("Failed to obtain a required resource lock. Aborting to avoid system deadlocks.");
            }
        }



        private static void Exit()
        {
            Monitor.Exit(_lock);
        }




        private sealed class LockerToken : IDisposable
        {
            internal LockerToken()
            {
                using (GlobalInitializerFacade.CoreNotLockedScope)
                {
                    ActionLockingFacade.Lock();
                }
            }



            public void Dispose()
            {
                ActionLockingFacade.Exit();
#if LeakCheck
                GC.SuppressFinalize(this);
#endif
            }

#if LeakCheck
            private string stack = Environment.StackTrace;
            /// <exclude />
            ~LockerToken()
            {
                Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
            }
#endif
        }
    }
}
