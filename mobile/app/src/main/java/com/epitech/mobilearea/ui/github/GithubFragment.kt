package com.epitech.mobilearea.ui.github

import android.os.AsyncTask
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProviders
import com.epitech.mobilearea.R
import com.epitech.mobilearea.ip
import com.epitech.mobilearea.port
import kotlinx.android.synthetic.main.fragment_github.*
import java.io.BufferedReader
import java.io.InputStreamReader
import java.io.OutputStream
import java.io.OutputStreamWriter
import java.net.HttpURLConnection
import java.net.URL

class GithubFragment : Fragment() {

    private lateinit var githubViewModel: GithubViewModel

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
            printDone()
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        githubViewModel =
            ViewModelProviders.of(this).get(GithubViewModel::class.java)
        val root = inflater.inflate(R.layout.fragment_gallery, container, false)
        return root
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        github_button.setOnClickListener {
            github_progressbar.visibility = View.VISIBLE
            NetworkAsyncTask().execute("http://$ip:$port/setgithub", "username=${github_text.text}")
        }
    }

    fun printDone() {
        Toast.makeText(activity,"Username updated!",Toast.LENGTH_SHORT).show()
        github_progressbar.visibility = View.INVISIBLE
    }
}