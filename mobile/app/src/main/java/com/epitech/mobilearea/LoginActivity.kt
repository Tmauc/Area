package com.epitech.mobilearea

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_login.*
import android.content.Intent
import android.os.AsyncTask
import android.view.View
import org.json.JSONObject
import java.io.BufferedReader
import java.io.InputStreamReader
import java.io.OutputStream
import java.io.OutputStreamWriter
import java.net.HttpURLConnection
import java.net.URL

class LoginActivity : AppCompatActivity()
{
    private inner class NetworkAsyncTask : AsyncTask<String, Int, String>()
    {
        override fun doInBackground(vararg parts: String?): String {
            val requestURL = parts.first()
            val queryString = parts.last()
            var returnv : String = ""

            val connection: HttpURLConnection = URL(requestURL).openConnection() as HttpURLConnection
            connection.requestMethod = "POST"
            connection.doOutput = true

            val outputStream: OutputStream = connection.outputStream
            val outputWriter = OutputStreamWriter(outputStream)
            outputWriter.write(queryString)
            outputWriter.flush()

            BufferedReader(InputStreamReader(connection.inputStream)).use {
                val response = StringBuffer()
                var inputLine = it.readLine()
                while (inputLine != null) {
                    response.append(inputLine)
                    inputLine = it.readLine()
                }
                response.toString()
                returnv = response.toString()
                it.close()
            }
            connection.disconnect()
            return returnv
        }

        override fun onPostExecute(result: String?)
        {
            verifyLogin(result)
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        button_register.setOnClickListener {
            val intent = Intent(this, RegisterActivity::class.java)
            intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
            startActivity(intent)
        }

        button_login.setOnClickListener {
            if (input_email.text.isEmpty() || input_password.text.isEmpty()) {
                Toast.makeText(this@LoginActivity, "Please, fill both fields to login.", Toast.LENGTH_SHORT).show()
            } else {
                progressBar.visibility = View.VISIBLE
                sendLoginRequest(input_email.text.toString(), input_password.text.toString())
            }
        }
    }

    private fun sendLoginRequest(userMail: String, password: String) {
        NetworkAsyncTask().execute("http://${ip}:${port}/login", "email=${userMail}&password=${password}")
    }

    fun verifyLogin(response: String?) {
        if (response is String) {
            var responseJson = JSONObject(response)
            progressBar.visibility = View.INVISIBLE
            Toast.makeText(
                this@LoginActivity,
                "${responseJson.getString("message")}",
                Toast.LENGTH_SHORT
            ).show()
            if (responseJson.getBoolean("type")) {
                val intent = Intent(this, MainActivity::class.java)
                intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
                intent.putExtra("response", response)
                startActivity(intent)
                finish()
            }
        }
    }
}
