import mysql.connector
from mysql.connector import Error
import json

DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'db_summarizer'
}

def test_connection():
    print("Testing database connection...")
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        if conn.is_connected():
            print("✅ Connection established.")
            return conn
    except Error as e:
        print(f"❌ Connection failed: {e}")
        return None

def test_insert_and_fetch(conn):
    print("\nTesting INSERT and SELECT...")
    cursor = conn.cursor(dictionary=True)
    try:
        # Insert dummy data
        sql = "INSERT INTO history (id, filename, summary, chat_logs, created_at) VALUES (%s, %s, %s, %s, NOW())"
        val = ("test_id_123", "test_file.pdf", json.dumps({"test": "summary"}), json.dumps([]))
        cursor.execute(sql, val)
        conn.commit()
        print("✅ Insert successful.")

        # Fetch data
        cursor.execute("SELECT * FROM history WHERE id = 'test_id_123'")
        row = cursor.fetchone()
        if row:
            print(f"✅ Fetch successful: {row['filename']}")
        else:
            print("❌ Fetch failed: Data not found.")
            
    except Error as e:
        print(f"❌ Database error: {e}")
    finally:
        cursor.close()

def test_delete(conn):
    print("\nTesting DELETE...")
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM history WHERE id = 'test_id_123'")
        conn.commit()
        print("✅ Delete successful.")
    except Error as e:
        print(f"❌ Delete failed: {e}")
    finally:
        cursor.close()

if __name__ == "__main__":
    conn = test_connection()
    if conn:
        test_insert_and_fetch(conn)
        test_delete(conn)
        conn.close()
        print("\n✅ All tests passed.")
    else:
        print("\n❌ Tests failed due to connection error.")
