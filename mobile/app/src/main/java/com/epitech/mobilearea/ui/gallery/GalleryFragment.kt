package com.epitech.mobilearea.ui.gallery

import android.os.AsyncTask
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ProgressBar
import android.widget.TextView
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProviders
import com.epitech.mobilearea.MainActivity
import com.epitech.mobilearea.R
import com.epitech.mobilearea.ip
import com.epitech.mobilearea.port
import java.io.BufferedReader
import java.io.InputStreamReader
import java.io.OutputStream
import java.io.OutputStreamWriter
import java.net.HttpURLConnection
import java.net.URL


class GalleryFragment : Fragment() {

    private lateinit var galleryViewModel: GalleryViewModel
    private lateinit var root: View

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

    fun printDone() {
        Toast.makeText(activity,"Username updated!",Toast.LENGTH_SHORT).show()
        root.findViewById<ProgressBar>(R.id.gallery_progressbar).visibility = View.INVISIBLE
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        galleryViewModel =
            ViewModelProviders.of(this).get(GalleryViewModel::class.java)
        root = inflater.inflate(R.layout.fragment_gallery, container, false)
        root?.findViewById<Button>(R.id.gallery_button)?.setOnClickListener {
            root.findViewById<ProgressBar>(R.id.gallery_progressbar).visibility = View.VISIBLE
            NetworkAsyncTask().execute("http://$ip:$port/setgithubusername", "email=${MainActivity.useremail}&username=${root.findViewById<TextView>(R.id.gallery_text).text}")
        }
        return root
    }
}