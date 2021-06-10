package com.epitech.mobilearea.ui.facebook

import android.content.Intent
import android.os.AsyncTask
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProviders
import com.epitech.mobilearea.MainActivity.Companion.useremail
import com.epitech.mobilearea.R
import com.epitech.mobilearea.ip
import com.epitech.mobilearea.port
import com.facebook.*
import com.facebook.login.LoginResult
import com.facebook.login.widget.LoginButton
import org.json.JSONObject
import java.io.BufferedReader
import java.io.InputStreamReader
import java.io.OutputStream
import java.io.OutputStreamWriter
import java.net.HttpURLConnection
import java.net.URL

class FacebookFragment : Fragment() {

    private lateinit var facebookViewModel: FacebookViewModel
    private var callbackManager: CallbackManager = CallbackManager.Factory.create()


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
            verifyFacebook(result)
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        facebookViewModel =
            ViewModelProviders.of(this).get(FacebookViewModel::class.java)
        val root = inflater.inflate(R.layout.fragment_facebook, container, false)

        var loginButton: LoginButton = root.findViewById(R.id.login_facebook)
        loginButton.fragment = this;
        loginButton.registerCallback(callbackManager, object : FacebookCallback<LoginResult?> {
            override fun onSuccess(loginResult: LoginResult?) {
                NetworkAsyncTask().execute("http://$ip:$port/auth/facebook", "userEmail=${useremail}&userId=${loginResult?.accessToken?.userId}&authToken=${loginResult?.accessToken?.token}")
            }
            override fun onCancel() {
                Toast.makeText(
                    activity,
                    "Cancelled facebook login",
                    Toast.LENGTH_SHORT
                ).show()
            }
            override fun onError(exception: FacebookException) {
                Toast.makeText(
                    activity,
                    "Error on facebook login",
                    Toast.LENGTH_SHORT
                ).show()
            }
        })
        return root
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        callbackManager.onActivityResult(requestCode, resultCode, data)
        super.onActivityResult(requestCode, resultCode, data)
    }

    fun verifyFacebook(response: String?) {
        if (response is String) {
            var responseJson = JSONObject(response)
            Toast.makeText(
                activity,
                responseJson.getString("message"),
                Toast.LENGTH_SHORT
            ).show()
        }
    }
}