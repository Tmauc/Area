package com.epitech.mobilearea.ui.home

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.epitech.mobilearea.MainActivity.Companion.list
import com.epitech.mobilearea.R
import com.epitech.mobilearea.createAreaction
import kotlinx.android.synthetic.main.reaction_view.view.*

class HomeFragment : Fragment() {
    private var adapter: HomeFragmentAdapter = HomeFragmentAdapter(list)

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_home, container, false)
        val rv = view.findViewById<RecyclerView>(R.id.rv_home)
        val tv = view.findViewById<ImageView>(R.id.image_mid)


        rv.adapter = this.adapter
        rv.layoutManager = LinearLayoutManager(this.activity)
        refreshHome()

        return view
    }

    override fun onResume() {
        super.onResume()
        refreshHome()
    }

    fun refreshHome()
    {
        adapter.notifyDataSetChanged()
    }


    fun yourMethod() {
        Toast.makeText(activity,"Text!",Toast.LENGTH_SHORT).show();
    }
}